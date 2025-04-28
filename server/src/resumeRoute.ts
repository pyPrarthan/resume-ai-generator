import express, { Request, Response } from "express";
import { OpenAI } from "openai";
import asyncHandler from "express-async-handler";

const router = express.Router();

// ➡️ Generate Resume API
router.post(
  "/generate-resume",
  asyncHandler(async (req: Request, res: Response) => {
    const { name, title, skills, experience, education } = req.body;

    if (!name || !title || !skills || !experience || !education) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const prompt = `Create a professional resume for the following individual:
      Name: ${name}
      Title: ${title}
      Skills: ${skills.join(", ")}
      Experience: ${experience}
      Education: ${education || "N/A"}
      
      Format it with bullet points for experience and include a strong summary at the top.`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      const responseText = completion.choices[0].message.content;
      res.json({ resume: responseText });
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

// ➡️ Test OpenAI API Key Route
router.get(
  "/test-openai",
  asyncHandler(async (req: Request, res: Response) => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "user", content: "Say Hello from Resume AI Project!" },
        ],
        model: "gpt-3.5-turbo",
      });

      const responseText = completion.choices[0].message.content;
      res.json({ message: responseText });
    } catch (error: any) {
      if (error?.status === 429) {
        console.log(
          "⚡ Rate limit exceeded during test. Please slow down and try again later."
        );
        res
          .status(429)
          .json({
            error: "Rate limit exceeded. Please try again after a few minutes.",
          });
      } else {
        console.log(
          "⚡ Unexpected OpenAI Test Error:",
          error?.message || error
        );
        res.status(500).json({ error: "Something went wrong during test." });
      }
    }
  })
);

export default router;
