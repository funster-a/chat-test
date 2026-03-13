import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "https://chat-test-khaki-chi.vercel.app",
  }),
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    error: true,
    message: "Слишком много запросов, подождите минуту.",
  },
});
app.use("/chat", limiter);

app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
