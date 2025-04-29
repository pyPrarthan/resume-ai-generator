import express, { Request, Response } from "express";
import { OpenAI } from "openai";
import asyncHandler from "express-async-handler";

const router = express.Router();

// ➡️ Generate Cold Email API
router.post(
  "/generate-coldemail",
  asyncHandler(async (req: Request, res: Response) => {
    const { name, recipient, position, skills, reason } = req.body;

    if (!name || !recipient || !position || !skills || !reason) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const prompt = `Draft a polite and professional cold email introducing the following individual:
      Name: ${name}
      Recipient or Company: ${recipient}
      Desired Position: ${position}
      Key Skills: ${skills}
      Reason for reaching out: ${reason}
      
      The email should be concise, friendly, and demonstrate genuine interest in an opportunity at the company.`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      const responseText = completion.choices[0].message.content;
      res.json({ email: responseText });
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
