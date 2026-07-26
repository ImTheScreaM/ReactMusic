import { prisma } from "../lib/prisma.js";
import { deleted_session, get_session } from "../prisma/actions/session.ts";

export async function change_bio(req, res) {
  const { new_bio } = req.body;

  const session = await get_session(req);

  if (!session) return res.status(401).json({message:"no auth"})

  try {
    const bio_change = await prisma.profile.update({
      where: {
        userId: session.userId,
      },
      data: {
        bio: new_bio,
      },
    });

    return res.status(200).json({ new_bio: bio_change });
  } catch (error) {
    res.status(404).json({error:error})
  }
}

export async function change_username(req, res) {
  const { new_name } = req.body;
  const session = await get_session(req);

  if (!session) return res.status(401).json({message:"no auth"})

  try {
    const new_username = await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        name: new_name,
      },
    });

    console.log(new_username);

    return res.status(200).json({ status: `success ${new_username}` });
  } catch (error) {
    res.status(404).json({error:error})
  }
}

export async function change_avatar(req, res) {
  const session = await get_session(req);
  const { newAvatar } = req.body;

  if (!session) return res.status(401).json({message:"no auth"})

  try {
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        urlAvatar: newAvatar,
      },
    });
    res.status(200).json({success:"UPDATE!"})
  } catch (error) {
    res.status(404).json({error:error})
  }
}

export async function session(req, res) {
  const session = await get_session(req);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      include: {
        id: false,
        password: false,
        role: false,
        loveMusic: true,
        profile: true,
      },
    });

    return res.status(200).json({
      auth: true,
      user: user,
    });
  } else {
    await deleted_session(res);
    return res.json({
      auth: false,
      path: "/",
      user: null,
    });
  }
}
