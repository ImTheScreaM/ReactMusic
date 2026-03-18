import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth_router.js";
import musicRouter from "./routes/music_router.js";
import userRouter from "./routes/user_router.js";

const app = express();
const URL = "http://localhost";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Set-Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",musicRouter)
app.use("/",userRouter)

app.listen(3003, (req, res) => {
  console.log(`Сервер запущен на ${URL}:3003`);
});
