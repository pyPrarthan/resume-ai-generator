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

    console.log("Using API Key:", process.env.OPENAI_API_KEY?.slice(0, 10));

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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
  })
);

// ➡️ Test OpenAI API Key Route
router.get(
  "/test-openai",
  asyncHandler(async (req: Request, res: Response) => {
    console.log(
      "Testing OpenAI API Key: SUCCESS",
    );

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "user", content: "Say Hello from Resume AI Project!" },
      ],
      model: "gpt-3.5-turbo",
    });

    const responseText = completion.choices[0].message.content;
    res.json({ message: responseText });
  })
);

export default router;
