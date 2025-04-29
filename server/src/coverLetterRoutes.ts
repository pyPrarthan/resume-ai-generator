import express, { Request, Response } from "express";
import { OpenAI } from "openai";
import asyncHandler from "express-async-handler";

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

    try {
      const prompt = `Write a personalized professional cover letter for the following individual:
      Name: ${name}
      Target Job Title: ${jobTitle}
      Target Company: ${companyName}
      Key Skills: ${skills}
      Achievements: ${achievements}
      
      The letter should be formal, engaging, and highlight why they are a perfect fit for the role at the company.`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      const responseText = completion.choices[0].message.content;
      res.json({ coverLetter: responseText });
    } catch (error: any) {
      if (error?.status === 429) {
        console.log(
          "⚡ Rate limit exceeded. Please slow down and try again later."
        );
        res
          .status(429)
          .json({
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
