import { prisma } from "../lib/prisma.ts";
import {
  get_session,
} from "../prisma/actions/session.ts";


export async function get_all_music(req,res) {


}

export async function find_music(req,res) {
  
}

export async function get_user_music(req,res) {

}

export async function love_user_music(req,res) {
  const session = await get_session(req);
  if (!session) return console.log("No session");

  try {
    const getMusic = await prisma.loveMusic.findMany({ 
      where: { userId: session.userId },
      data: {
        name: true,
        artist: true,
        time: true,
        description: true,
        urlAvatar: true,
      },
    });

    res.json(200).status({ userMusic: { getMusic } });
  } catch (error) {
    console.log("my_music", error);
  }
}

export async function add_music(req,res) {
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
}

export async function remove_user_music(req,res) {
  const session = await get_session(req);
  const { name, artist } = req.body;

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
    console.log("remove_my_music", error);
  }
}
