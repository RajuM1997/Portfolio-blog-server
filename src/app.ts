import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./routes";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

// Middleware
// app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://raju-portfolio-five.vercel.app"],
    credentials: true,
  }),
);

// Default route for testing
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Blog api",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
