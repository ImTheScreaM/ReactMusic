import { prisma } from "../lib/prisma.ts";
import { get_session } from "../prisma/actions/session.ts";

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
  const { username } = req.body;
  const { session } = await get_session(req);

  if (!session) return console.log("Wrong session");

  try {
    const new_username = await prisma.user.update({
      where: {
        userId: session.userId,
      },
      data: {
        update: {
          name: username,
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
    return res.status(200).json({
      auth: true,
    });
  } else {
    await res.json({
      auth: false,
      path: "/",
    });
  }
}
