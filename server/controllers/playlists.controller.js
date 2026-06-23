import {prisma} from "../lib/prisma.js"
import {get_session} from "../prisma/actions/session.ts";
import {CheckerLikeMusic} from "../utils/musicLikesHelper.js";

const validate_params_in_add_remove_music = async (playlistId,musicId) => {
  if (!playlistId || !musicId) {
   throw new Error("need playlistId and musicId is required")
  }

  const playlist = await prisma.playlists.findUnique({
    where: { id: parseInt(playlistId) }
  });

  if (!playlist) {
    throw new Error("Плейлист не найден")
  }

  const music = await prisma.music.findUnique({
    where: { id: parseInt(musicId) }
  });

  if (!music) {
    throw new Error("Трек не найден")
  }
}


export async function create_playlist(req,res) {
  const session = await get_session(req);
  const {name} = req.body;

  try {
    const playlist = await prisma.playlists.create({
      data: {
        name:name,
        userId: session.userId,
        avatar:"none"
      }
    })
    res.json({
      message:"Successfully created playlist",
      playlist:playlist
    });
  } catch (error) {
    console.log(error);
  }

}

export async function delete_playlist(req,res) {
  const session = await get_session(req);
  const {playlistId} = req.body;

  try {
    await prisma.playlists.delete({
      where: {
        id:playlistId,
        userId: session.userId
      }
    })
    res.json({
      message:"Successfully deleted playlist"
    })
  } catch (error) {
    console.log(error)
  }

}

export async function get_playlist(req,res) {
  const session = await get_session(req);

  try {
    const playlist = await prisma.playlists.findMany({
      where: {userId: session.userId},
      include: {
        musics: {
          include: {
            music:true
          }
        }
      }
    })
    res.json(playlist);
  } catch (error) {

  }

}

export async function add_music_in_playlist(req,res) {
  try {
    const {playlistId,musicId} = req.body;
    await validate_params_in_add_remove_music(playlistId,musicId);

    const existingMusic = await prisma.playlistMusic.findUnique({
      where: {
        playlistId_musicId: {
          playlistId: parseInt(playlistId),
          musicId: parseInt(musicId)
        }
      }
    })

    if(existingMusic) {
      res.json({
        message:"Already has"
      })
    } else {
      const music = await prisma.playlistMusic.create({
        data: {
          playlistId: parseInt(playlistId),
          musicId: parseInt(musicId)
        },
        include: {
          music:true,
          playlist: true
        }
      })
      res.json({
        message:"Successfully added music",
        data:music
      })
    }

  } catch (error) {
    console.log(error);
  }
} 


export async function delete_music_from_playlist(req,res) {
  const {playlistId,musicId} = req.body;

  console.log(req.body)

  await validate_params_in_add_remove_music(playlistId,musicId);

  try {
    await prisma.playlistMusic.delete({
      where: {
        playlistId_musicId: {
          playlistId: parseInt(playlistId),
          musicId:parseInt(musicId)
        }
      }
    })

    res.json({
    message:"Successfully deleted",
    playlistId:parseInt(musicId),
    musicId:parseInt(musicId)})

  } catch (error) {
    console.log(error);
  }
}

export async function get_music_playlist(req,res) {
  const session = await get_session(req);
  const {playlistId} = req.body;

  try {

    const playlist_music = await prisma.playlistMusic.findMany({
      where: {playlistId: Number(playlistId)},
      include: {
        music:true,
      }
    })

    const musicWithLikes = await CheckerLikeMusic(
        playlist_music,
        (item) => item.music,
        session
    )

    res.json(musicWithLikes);
  } catch (error) {
    console.log(error);
  }

}
