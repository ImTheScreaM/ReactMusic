import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { create_session, deleted_session } from "../prisma/actions/session.ts";

export async function register(req, res) {
  const { name, password, email } = req.body;
  if (!(name && password && email)) {
    return res.status(400).json({ errors: "No user,password,email" });
  }

  try {
    const userFind = await prisma.user.findUnique({ where: { email: email } });
    if (userFind) return res.status(400).json({ errors: "user has" });

    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        password: passwordHash,
        email: email,
        urlAvatar: "none",
        profile: {
          create: {
            bio: "",
          },
        },
      },
      include: {
        profile: true,
        loveMusic: true,
      },
    });

    res.status(200).json({ user: user });
  } catch (error) {
    return;
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const userFind = await prisma.user.findUnique({ where: { email: email } });
  const passCheck = await bcrypt.compare(password, userFind.password);

  if (!userFind || !passCheck) {
    return res.status(400).json({ errors: "no valide data or no password" });
  }

  await create_session(userFind.id, res);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      id: false,
      password: false,
      role: false,
      loveMusic: true,
      profile: true,
    },
  });
  await res
    .status(200)
    .json({ success: "Login!", user: user, path: "/profile" });
}

export async function logout(req, res) {
  await deleted_session(res);
  return res.status(200).json({ success: "logout", path: "/" });
}
