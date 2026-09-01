import { prisma } from "../lib/prisma.js";
import { CheckerLikeMusic } from "./musicLikesHelper.js";

export async function SearchDatasHelper(searchBy,value,session) {
  const music = await prisma.music.findMany({
    where: {
      [searchBy]: {
        contains: value,
        mode: "insensitive",
      },
    },
  });

  if (!music) return res.status(400).json({ search: "no music" });

  const musicWithLikes = CheckerLikeMusic(music, (item) => item, session);

  return musicWithLikes;
}
