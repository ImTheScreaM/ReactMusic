import {prisma} from "../lib/prisma.js";
import {get_session} from "../prisma/actions/session.ts";
import {CheckerLikeMusic} from "../utils/musicLikesHelper.js";

export async function get_all_music(req,res) {
  const session = await get_session(req);
  try {
    const allMusic = await prisma.music.findMany();

    const musicWithLikes = await CheckerLikeMusic (
        allMusic,
        (item) => item,
        session
    )

    res.status(200).json({music:musicWithLikes})

  } catch (err) {
    return res.status(500);
  }


}

export async function get_love_user_music(req,res) {
  const session = await get_session(req);
  if (!session) return console.log("No session");

  try {
    const loveMusic = await prisma.loveMusic.findMany({
      where: { userId: session.userId },
      include: {
        music: true,
      }
    });

    console.log(loveMusic);

    const getMusic = loveMusic.map(item => ({
      id: item.music.id,
      name: item.music.name,
      artist: item.music.artist,
      genre: item.music.genre,
      description: item.music.description,
      time: item.music.time,
      urlAvatar: item.music.urlAvatar,
      isLiked: true
    }));

    res.status(200).json({ userMusic: { getMusic } });
  } catch (error) {
    console.log("my_music", error);
  }
}

export async function add_rm_user_music(req,res) {
  const session = await get_session(req);
  if(!session) return;

  const {id} = req.body;
  const musicExists = await prisma.music.findUnique({
    where: {
      id:id
    }
  })

  if (!musicExists) return console.log("NO FIND MUSIC");

  const findMusicUser = await prisma.loveMusic.findUnique({
    where: {
      userId_musicId: {
        userId:session.userId,
        musicId:id
      }
    }
  })
  let liked = false;

  try {
    if(findMusicUser) {
      return await prisma.loveMusic.delete({
        where: {
          userId_musicId: {
            userId:session.userId,
            musicId:id
          }
        }
      })
      liked = false;
    } else {
      const music = await prisma.loveMusic.create({
        data: {
          userId:session.userId,
          musicId:id
        },
      });
      liked = true;
    }

  } catch (error) {
    console.log("add_rm",error);
  }
}

