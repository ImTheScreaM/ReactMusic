import {prisma} from "../lib/prisma.js";

export async function search_music_by_name(req, res) {
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

    console.log(music)

    if (!music) res.json({search: "no found"});

    return res.status(200).json({search: music});
  } catch (error) {
    console.error(error);
  }
}

export async function search_music_by_artist(req, res) {
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

    if (!music) res.json({search: "no found"});

    return res.status(200).json({search: music});
  } catch (error) {
    console.error(error);
  }


}