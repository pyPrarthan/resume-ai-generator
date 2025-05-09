import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Load correct .env
dotenv.config({ path: path.join(process.cwd(), ".env") });
console.log("🌍 .env file loaded from:", path.join(process.cwd(), ".env"));
console.log(
  "✅ Using API Key:",
  process.env.OPENAI_API_KEY?.slice(0, 8) +
    "..." +
    process.env.OPENAI_API_KEY?.slice(-4)
);

import resumeRoute from "./resumeRoute";
import coverLetterRoute from "./coverLetterRoutes";
import coldEmailRoute from "./coldEmailRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Setup CORS for both local and deployed frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://resume-ai-generator-client.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ➕ Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Resume API is up and running 🚀");
});

app.get("/api/ping", (req: Request, res: Response) => {
  res.json({ message: "Server is live 🔥" });
});

app.use("/api", resumeRoute);
app.use("/api", coverLetterRoute);
app.use("/api", coldEmailRoute);

// 🔊 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
