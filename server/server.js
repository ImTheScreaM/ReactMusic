import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import cors from "cors";
import { prisma } from "./lib/prisma.ts";
import { validate } from "./middleware/middleware.js";
import { auth_schema } from "./middleware/middleware.js";
import {
  create_session,
  deleted_session,
  get_session,
} from "./prisma/actions/session.ts";

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



app.post("/register", validate(auth_schema.registerSchema), async (req, res) => {
  const { name, password, email } = req.body;

  if (!(name && password && email)) {
    return res.status(400).json({ errors: "No user,password,email" });
  }

  try {
    const userFind = await prisma.user.findUnique({ where: { email: email } });
    if (userFind) return res.status(400).json({ errors: "user has" });

    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        password: passwordHash,
        email: email,
        profile: {
          create: {
            bio: "",
          },
        },
        loveMusic: {
          create: traks || [],
        },
      },
      include: {
        profile: true,
        loveMusic: true,
      },
    });

    res.status(200).json({ user: user });
  } catch (error) {
    console.log("!!!!!!!", error);
  }
});

app.post("/login", validate(auth_schema.loginSchema), async (req, res) => {
  const { email, password } = req.body;

  const userFind = await prisma.user.findUnique({ where: { email: email } });
  const passCheck = await bcrypt.compare(password, userFind.password);
  
  
  if (!userFind && !passCheck) {
    return res.status(400).json({ errors: "no valide data or no password" });
  }
  await create_session(userFind.id, res);

  await res
    .status(200)
    .json({ success: "Login!", secure: true, path: "/profile" });
});

app.post("/logout", async (req, res) => {
  await deleted_session(res);
  return res.status(200).json({ success: "logout", path: "/" });
});

app.get("/session", async (req, res) => {
  const session = await get_session(req);

  if (session) {
    return res.status(200).json({
      auth: true,
    });
  } else {
    await res.json({
      auth: false,
      path: "/",
    });
  }
});

app.get("/my_music", async (req, res) => {
  const session = await get_session(req);
  if(!session) return console.log("No session");
  
  try {
    const getMusic = await prisma.loveMusic.findMany({
      where:{userId:session.userId},
      data:{
        name:true,
        artist:true,
        time:true,
        description:true,
        urlAvatar:true
      }
    })
    
    res.json(200).status({userMusic:{getMusic}})
  } catch(error) {
    console.log("my_music",error)
  }

});

app.post("/add_music", async (req, res) => {
  const session = await get_session(req);
  const { name, artist, genre, description } = req.body;

  if (!session) return console.log("No session");

  try {
    const musicFind = await prisma.loveMusic.findFirst({
      where: {
        userId: session.userId,
        name: name,
        artist: artist,
      },
    });

    if (musicFind) return console.log("Music already has");

    const music = await prisma.loveMusic.create({
      data: {
        userId: session.userId,
        name: name,
        artist: artist,
        genre: genre,
        description: description,
      },
    });

    const updateUser = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        loveMusic: true,
        profile: true,
      },
    });

    res.status(200).json({ new_update: { updateUser } });
  } catch (error) {
    console.log("add_music", error);
  }
});

app.delete("/remove_my_music", async (req, res) => {
  const session = await get_session(req);
  const { name, artist, genre, description } = req.body;

  if (!session) return console.log("no session");

  try {
    const deleteMusic = await prisma.loveMusic.delete({
      where: {
        userId: session.userId,
        name: name,
        artist: artist,
      },
    });
  } catch (error) {
    console.log("remove_my_music",error);
  }
});

app.get("/music", async (req, res) => {
  //const music = await prisma.music.findMany({
  //select: {
  //title:true,
  //description:true,
  //avatar:true,
  //author:true,
  //time:true,
  //url:true
  //}
  //})
  //await res.json({
  //music_res:{
  //music
  //}
  //})
});

app.post("/music", async (req, res) => {});

app.delete("/music", async (req, res) => {});

app.get("/music:title", async (req, res) => {
  const { title } = req.body;
});

app.post("/user/bio_change",async (req,res) => {
  const {bio} = req.body;
  
  const {session} = await get_session(req);

  if (!session) return console.log('Wrong session');

  try {
    const bio_change = await prisma.user.update({
      where:{
        userId: session.userId
      },
      data:{
        profile: {
          update:{
            bio: {
              bio
            }
          }
        }
      },
      include: {
        profile:true
      }
    });

    return res.status(200).json({new_bio:bio_change});
  } catch (error) {
    console.log("change bio err",error);
  }

})

app.post("/change_username", async (req,res) => {
  const {username} = req.body;
  const {session} = await get_session(req);

  if(!session) return console.log("Wrong session");


  try {
    const new_username = await prisma.user.update({
      where: {
        userId: session.userId
      },
      data: {
        update: {
          name: username
        }
      }

    })

    return res.status(200).json({status:`success ${new_username}`});
  } catch (error) {
    console.log(error);
  }


})

app.listen(3003, (req, res) => {
  console.log(`Сервер запущен на ${URL}:3003`);
});
