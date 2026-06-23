import {prisma} from "../lib/prisma.js";

export async function CheckerLikeMusic(musicArray,getMusicFromItem,session) {
  if (!session) {
    return musicArray.map(item => {
      const music = getMusicFromItem(item);

      return {
        ...item,
        ...(music !== item ? {music : {...music,isLiked:false}} : {isLiked:false})
      }
    })
  }

  const musicIds = musicArray.map(item => {
    const music = getMusicFromItem(item);
    return music.id;
  })

  const likedMusic = await prisma.loveMusic.findMany({
    where: {
      userId: session.userId,
      musicId:{in:musicIds},
    }
  })

  const likedIds = new Set(likedMusic.map(item => item.musicId));

  return musicArray.map(item => {
    const music = getMusicFromItem(item);
    const isLiked = likedIds.has(music.id);

    if (music == item) {
      return {...item, isLiked};
    }

    return {
      ...item,
      music:{...music,isLiked},
    }

  })

}