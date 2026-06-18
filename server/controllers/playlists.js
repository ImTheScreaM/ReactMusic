import {prisma} from "../lib/prisma"


export async function createPlaylist(req,res) {
  const {name} = res.body;

  await prisma.playlists.create({
    data: {
      name:name,
      avatar:'none',
      musics:[],
    }
  })

  res.status(200);

}

export async function addMusicForPlaylist(req,res) {
  const {name,idMusic} = res.body;

  const findMusic = await prisma.playlists.findUniqe({where:{name:name}});

  if(findMusic) return res.status(400);


  await prisma.playlists.update({
    data : {
      id:idMusic,
      name:name
    }
  })
  res.status(200);
} 


export async function deltedMusicForPlaylist(req,res) {
  const {name,idMusic} = res.body;


  await prisma.playlists.delte({
    data: {
      name:name,
      id:idMusic
    }
  })

  res.status(200)
}


