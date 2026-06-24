import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session"
import helmet from "helmet";
import "dotenv/config"

import authRouter from "./routes/auth.router.js";
import musicRouter from "./routes/music.router.js";
import userRouter from "./routes/user.router.js";
import searchRouter from "./routes/search.router.js";
import playlistRouter from "./routes/playlist.router.js";
import path from "path";

const app = express();
const URL = "http://localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Set-Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
      domain: "localhost",
      path: "/",
    },
    rolling: true,
  })
);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:["'self'"],
      scriptSrc:["'self'"],
      styleSrc:["'self'"],
      imgSrc:["'self'"],
      connectSrc:["'self'","http://localhost:3003"]
    }
  }
}));


app.use("/",authRouter)
app.use("/",musicRouter)
app.use("/",userRouter)
app.use("/",searchRouter)
app.use("/",playlistRouter)

app.listen(3003, () => {
  // loadMusic()
  console.log(`Сервер запущен на ${URL}:3003`);
});
