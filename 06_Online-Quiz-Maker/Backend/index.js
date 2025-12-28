import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import statsRoutes from "./routes/stats.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import resultRoutes from "./routes/result.routes.js";



dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({origin:"https://quizmaker-8n5u5l5i1-pushpaks-projects-481b28fb.vercel.app", credentials:true}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/stats", statsRoutes);




// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = "https://quizmaker-8n5u5l5i1-pushpaks-projects-481b28fb.vercel.app";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
