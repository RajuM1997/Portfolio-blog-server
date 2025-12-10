import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
// app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://next-blog-ui-henna.vercel.app"],
    credentials: true,
  })
);

// Default route for testing
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Blog api",
  });
});

app.use("/api/v1", router);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
