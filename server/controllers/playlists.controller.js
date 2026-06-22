import {prisma} from "../lib/prisma.js"
import {get_session} from "../prisma/actions/session.ts";


export async function create_playlist(req,res) {
  const session = await get_session(req);
  const {name} = req.body;

  try {
    await prisma.playlists.create({
      data: {
        name:name,
        userId: session.userId,
        avatar:"none"
      }
    })
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
  const {playlistId,musicId} = req.body;

  try {
    await prisma.playlistMusic.create({
      data: {
        playlistId: playlistId,
        musicId: musicId
      },
      include: {
        music:true,
        playlist:true
      }
    })
  } catch (error) {
    console.log(error);
  }
} 


export async function delete_music_from_playlist(req,res) {
  const {playlistId,musicId} = req.body;

  try {
    await prisma.playlistMusic.delete({
      where: {
        playlistId_musicId: {
          playlistId: playlistId,
          musicId:musicId
        }
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export async function get_music_playlist(req,res) {
  const {playlistId} = req.body;

  try {
    const playlist_music = await prisma.playlistMusic.findMany({
      where: {playlistId: Number(playlistId)},
      include: {
        music:true,
      }
    })
    res.json(playlist_music);
  } catch (error) {
    console.log(error);
  }

}
