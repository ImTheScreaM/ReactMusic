import {prisma} from "../lib/prisma.js";
import {CheckerLikeMusic} from "../utils/musicLikesHelper.js";
import {get_session} from "../prisma/actions/session.ts";

export async function search_music_by_name(req, res) {
  const session = await get_session(req);
  const name = req.body.value;

  try {
    const music = await prisma.music.findMany({
      where:{
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    });

    const musicWithLikes = await CheckerLikeMusic(
        music,
        (item) => item,
        session
    )

    console.log(music)

    if (!music) res.json({search: "no found"});

    return res.status(200).json({search: musicWithLikes});
  } catch (error) {
    console.error(error);
  }
}

export async function search_music_by_artist(req, res) {
  const session = await get_session(req);
  const artist = req.body.value;
  console.log(artist);
  try {
    const music = await prisma.music.findMany({
      where:{
        artist:
            {
              contains:artist,
              mode: 'insensitive'
            }
      }
    });

    const musicWithLikes = await CheckerLikeMusic(
        music,
        (item) => item,
        session
    )

    if (!music) res.json({search: "no found"});

    return res.status(200).json({search: musicWithLikes});
  } catch (error) {
    console.error(error);
  }


}