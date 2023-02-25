import bcrypt from "bcrypt";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { tokenGenerator } from "@/utils/token.utils";

const prisma = new PrismaClient();

const loginHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { sid, password } = req.body;

  try {
    const user = await prisma.student.findFirst({
      where: {
        sid,
      },
    });

    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = tokenGenerator({ sid: user.sid });

    await prisma.student.update({
      where: {
        sid,
      },
      data: {
        token,
      },
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default loginHandler;
