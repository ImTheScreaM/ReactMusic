import { getVideoDurationInSeconds } from "get-video-duration";
import { prisma } from "../lib/prisma.js";

import { get_session } from "../prisma/actions/session.ts";
import { CheckerLikeMusic } from "../utils/musicLikesHelper.js";

export async function get_all_music(req, res) {
  const session = await get_session(req);
  try {
    const allMusic = await prisma.music.findMany();

    const musicWithLikes = await CheckerLikeMusic(
      allMusic,
      (item) => item,
      session,
    );

    res.status(200).json({ music: musicWithLikes });
  } catch (err) {
    return res.status(500);
  }
}

export async function get_love_user_music(req, res) {
  const session = await get_session(req);
  if (!session) return console.log("No session");

  try {
    const loveMusic = await prisma.loveMusic.findMany({
      where: { userId: session.userId },
      include: {
        music: true,
      },
    });

    console.log(loveMusic);

    const getMusic = loveMusic.map((item) => ({
      id: item.music.id,
      name: item.music.name,
      artist: item.music.artist,
      genre: item.music.genre,
      description: item.music.description,
      time: item.music.time,
      urlAvatar: item.music.urlAvatar,
      audioUrl: item.music.audioUrl,
      isLiked: true,
    }));

    res.status(200).json({ userMusic: { getMusic } });
  } catch (error) {
    console.log("my_music", error);
  }
}

export async function get_artist_music(req, res) {
  try {
    const { idArtist } = req.body;
    const artistInformation = await prisma.user.findUnique({
      where: { id: idArtist },
      select: {
        name: true,
        urlAvatar: true,
      },
    });

    const artistMusic = await prisma.music.findMany({
      where: { userWhoAdd: idArtist },
      orderBy: {
        createAt: "desc",
      },
    });
    console.log(artistInformation);
    res
      .status(200)
      .json({
        data: { dataMusic: artistMusic, dataArtist: artistInformation },
      });
  } catch (error) {
    console.log("artisterr", error);
    res.json({ error: "error get artist music" });
  }
}

export async function add_rm_user_music(req, res) {
  const session = await get_session(req);
  if (!session) return res.status(401).json({ message: "no auth" });

  const { id } = req.body;
  const musicExists = await prisma.music.findUnique({
    where: {
      id: id,
    },
  });

  if (!musicExists) return res.status(404).json({ message: "no find music" });

  const findMusicUser = await prisma.loveMusic.findUnique({
    where: {
      userId_musicId: {
        userId: session.userId,
        musicId: id,
      },
    },
  });

  try {
    if (findMusicUser) {
      await prisma.loveMusic.delete({
        where: {
          userId_musicId: {
            userId: session.userId,
            musicId: id,
          },
        },
      });

      res.json({
        liked: false,
      });
    } else {
      await prisma.loveMusic.create({
        data: {
          userId: session.userId,
          musicId: id,
        },
      });
      res.status(200).json({
        liked: true,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

export async function upload_music(req, res) {
  try {
    const session = await get_session(req);
    if (!session) return res.status(401).json({ message: "no auth" });

    const { idUser, name, description, genre, username } = req.body;
    const durationMusic = await getVideoDurationInSeconds(
      req.files.audio[0].path,
    );
    const durationInSeconds = Math.round(durationMusic);

    await prisma.music.create({
      data: {
        name: name,
        description: description,
        genre: genre,
        artist: username,
        urlAvatar: `/uploads/avatar/${req.files.avatar[0].filename}`,
        audioUrl: `/uploads/audio/${req.files.audio[0].filename}`,
        time: durationInSeconds,
        userWhoAdd: Number(idUser),
      },
    });
    res.status(200).json({
      completed: true,
    });
  } catch (error) {
    console.log("upload_music", error);
  }
}
