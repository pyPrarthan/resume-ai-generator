import express, { Request, Response } from "express";
import { OpenAI } from "openai";
import asyncHandler from "express-async-handler";

import ejs from "ejs";
import path from "path";
import puppeteer from "puppeteer";

const router = express.Router();

// ➡️ Generate Cover Letter API
router.post(
  "/generate-coverletter",
  asyncHandler(async (req: Request, res: Response) => {
    const { name, jobTitle, companyName, skills, achievements } = req.body;

    if (!name || !jobTitle || !companyName || !skills || !achievements) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Write a compelling, customized cover letter for a job application with the following details.

Please structure the letter like this:
- Start with a professional greeting to the hiring team at ${companyName}.
- Begin with a strong introduction stating interest in the ${jobTitle} role.
- Highlight 2–3 of the candidate’s key skills and achievements most relevant to the job.
- Include why they are a great cultural and technical fit for ${companyName}.
- End with a confident closing that expresses enthusiasm and invites further conversation.

Details:
Name: ${name}
Target Job Title: ${jobTitle}
Target Company: ${companyName}
Skills: ${skills}
Achievements: ${achievements}

Tone: Professional, warm, and confident.
Length: Around 3–5 paragraphs.
Sign off with the candidate’s name.`;

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      const letter = completion.choices[0].message.content || "";

      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const html = await ejs.renderFile(
        path.join(__dirname, "../templates/cover-letter-template.ejs"),
        {
          name,
          letter,
          date: today,
          jobTitle,
          companyName,
          skills: skills.map((s: string) => s.trim()),
          achievements:
            typeof achievements === "string"
              ? achievements
                  .split(".")
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              : achievements,
        }
      );


      const browser = await puppeteer.launch({ headless: "new" as any });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      await browser.close();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${name}_CoverLetter.pdf`
      );
      res.send(pdfBuffer);
    } catch (error: any) {
      if (error?.status === 429) {
        console.log(
          "⚡ Rate limit exceeded. Please slow down and try again later."
        );
        res.status(429).json({
          error: "Rate limit exceeded. Please try again after a few minutes.",
        });
      } else {
        console.log("⚡ Unexpected OpenAI Error:", error?.message || error);
        res
          .status(500)
          .json({ error: "Something went wrong. Please try again." });
      }
    }
  })
);

export default router;
