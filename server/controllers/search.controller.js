import { prisma } from "../lib/prisma.js";
import { get_session } from "../prisma/actions/session.ts";
import { SearchDatasHelper } from "../utils/searchDatasHelper.js";

export async function search_music_by_name(req, res) {
  const session = await get_session(req);
  const value = req.body.value;
  if (!value) return res.status(400).json({ search: "no name music" });
  try {
    const musicWithLikes = await SearchDatasHelper("name", value, session);

    return res.status(200).json({search:{ music: musicWithLikes }});
  } catch (error) {
    console.error(error);
  }
}

export async function search_music_by_artist(req, res) {
  const session = await get_session(req);
  const { value } = req.body;

  if (!value) return res.status(400).json({ search: "no name artist" });
  try {
    const artistSearch = await prisma.user.findMany({
      where: {
        name: {
          contains: value,
          mode: "insensitive",
        },
      },
    });

    if (!artistSearch) return res.json({ error: "no artist" });
    const musicWithLikes = await SearchDatasHelper("artist", value, session);

    return res
      .status(200)
      .json({
        search: { artistInformation: artistSearch, music: musicWithLikes },
      });
  } catch (error) {
    console.error(error);
  }
}

export async function search_music_by_genre(req, res) {
  const session = await get_session(req);
  const value = req.body.value;

  if (!value) return res.status(400).json({ search: "no genre" });

  try {
    await SearchDatasHelper("genre", value, session);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
