import express, { Request, Response } from "express";
import { OpenAI } from "openai";
import asyncHandler from "express-async-handler";
import ejs from "ejs";
import path from "path";
//import puppeteer from "puppeteer"; // ✅ use full puppeteer now

import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";


const router = express.Router();

router.post(
  "/generate-resume",
  asyncHandler(async (req: Request, res: Response) => {
    const {
      name,
      title,
      skills: rawSkills,
      experience: rawExperience,
      education,
    } = req.body;

    if (!name || !title || !rawSkills || !rawExperience || !education) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
Please generate a professional resume with the following structure and clearly labeled sections:

**Professional Summary:** (Write 1–2 concise, impactful lines)

**Skills:** (List in comma-separated format)

**Experience:** (Use bullet points with a '-' prefix for each item)

**Education:** (Keep this concise)

Name: ${name}
Title: ${title}
Skills: ${rawSkills.join(", ")}
Experience: ${rawExperience}
Education: ${education}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const responseText = completion.choices[0].message.content || "";

    const getSection = (label: string) => {
      const regex = new RegExp(
        `\\*\\*${label}:\\*\\*([\\s\\S]*?)(?=\\*\\*|$)`,
        "i"
      );
      const match = responseText.match(regex);
      return match ? match[1].trim() : "";
    };

    const summary = getSection("Professional Summary");
    const skillsText = getSection("Skills");
    const experienceText = getSection("Experience");
    const parsedEducation = getSection("Education");

    const parsedSkills = skillsText.split(/,\s*/);
    const parsedExperience = experienceText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => line.replace(/^- /, ""));

    const html = await ejs.renderFile(
      path.join(__dirname, "../templates/resume-template.ejs"),
      {
        name,
        title,
        summary,
        skills: parsedSkills,
        experience: parsedExperience,
        education: parsedEducation,
      }
    );

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    
    

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "a4", printBackground: true });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${name}_Resume.pdf`
    );
    res.send(pdfBuffer);
  })
);

// ➡️ Test OpenAI API Key Route
router.get(
  "/test-openai",
  asyncHandler(async (req: Request, res: Response) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "user", content: "Say Hello from Resume AI Project!" },
        ],
        model: "gpt-3.5-turbo",
        stream: false,
      });

      const responseText = response.choices[0].message.content;

      console.log("✅ OpenAI Response ID:", response.id);
      console.log("🧠 Model:", response.model);
      console.log(
        "🕒 Created:",
        new Date(response.created * 1000).toISOString()
      );

      res.json({
        message: responseText,
        requestId: response.id,
        model: response.model,
        created: response.created,
      });
    } catch (error: any) {
      if (error?.status === 429) {
        console.log("❌ Rate limit exceeded.");
        console.log(
          "📛 Request ID:",
          error?.headers?.["x-request-id"] || "N/A"
        );

        res.status(429).json({
          error: "Rate limit exceeded. Please try again after a few minutes.",
          requestId: error?.headers?.["x-request-id"] || "N/A",
        });
      } else {
        console.error("⚡ Unexpected OpenAI Error:", error?.message || error);
        res.status(500).json({ error: "Something went wrong during test." });
      }
    }
  })
);

export default router;
