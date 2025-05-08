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
console.log("✅ Using API Key:", process.env.OPENAI_API_KEY?.slice(0, 8) + "..." + process.env.OPENAI_API_KEY?.slice(-4));


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

    console.log(
      "✅ Using API Key:",
      process.env.OPENAI_API_KEY
    );


    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "user", content: "Say Hello from Resume AI Project!" },
        ],
        model: "gpt-3.5-turbo",
        stream: false,
      });

      const responseText = response.choices[0].message.content;

      // 🧾 Log relevant headers if available (workaround since OpenAI SDK doesn't expose raw headers)
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
