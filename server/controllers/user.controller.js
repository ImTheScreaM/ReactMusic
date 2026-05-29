import { prisma } from "../lib/prisma.js";
import {deleted_session, get_session} from "../prisma/actions/session.ts";


export async function change_bio(req, res) {
  const { bio } = req.body;

  const { session } = await get_session(req);

  if (!session) return console.log("Wrong session");

  try {
    const bio_change = await prisma.user.update({
      where: {
        userId: session.userId,
      },
      data: {
        profile: {
          update: {
            bio: {
              bio,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return res.status(200).json({ new_bio: bio_change });
  } catch (error) {
    console.log("change bio err", error);
  }
}

export async function change_username(req, res) {
  const { new_name } = req.body;
  const { session } = await get_session(req);

  if (!session) return console.log("Wrong session");

  try {
    const new_username = await prisma.user.update({
      where: {
        userId: session.userId,
      },
      data: {
        update: {
          name: new_name,
        },
      },
    });

    return res.status(200).json({ status: `success ${new_username}` });
  } catch (error) {
    console.log(error);
  }
}

export async function session(req, res) {
  const session = await get_session(req);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id:session.userId,
      },
      include: {
        id:false,
        password:false,
        role:false,
        loveMusic:true,
        profile:true,
      }
    })

    return res.status(200).json({
      auth: true,
      user:user
    });

  } else {
    await deleted_session(res);
    await res.json({
      auth: false,
      path: "/",
      user:null
    });
  }
}
