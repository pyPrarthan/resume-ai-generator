import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to the server!" );
})

app.get("/api/ping", (req: Request, res: Response) => {
  res.json({ message: "Server is live 🔥" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
