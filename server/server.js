import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session"
import helmet from "helmet";

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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-super-secret-key-change-this",
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

app.listen(3003, (req, res) => {
  console.log(`Сервер запущен на ${URL}:3003`);
});
