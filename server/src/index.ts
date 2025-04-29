import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Load correct .env
dotenv.config({ path: path.join(process.cwd(), ".env") });


import resumeRoute from "./resumeRoute";
import coverLetterRoute from "./coverLetterRoutes";
import coldEmailRoute from "./coldEmailRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Resume API is up and running 🚀");
});

app.get("/api/ping", (req: Request, res: Response) => {
  res.json({ message: "Server is live 🔥" });
});

app.use("/api", resumeRoute);
app.use("/api", coverLetterRoute);
app.use("/api", coldEmailRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
