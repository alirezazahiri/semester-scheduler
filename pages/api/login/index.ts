import bcrypt from "bcrypt";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import {
  deleteTokenCookie,
  setTokenCookie,
  tokenGenerator,
} from "@/utils/token.utils";

const prisma = new PrismaClient();

const loginHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ statusCode: 405, success: false, message: "Method not allowed" });
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
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Invalid username or password",
      });

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Invalid username or password",
      });
    deleteTokenCookie({ req, res });
    const token = tokenGenerator({ sid: user.sid });
    setTokenCookie(token, { req, res });
    await prisma.student.update({
      where: {
        sid,
      },
      data: {
        token,
      },
    });

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ statusCode: 500, success: false, message: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default loginHandler;
