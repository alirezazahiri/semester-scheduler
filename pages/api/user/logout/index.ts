import bcrypt from "bcrypt";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import {
  deleteTokenCookie,
  getTokenCookie,
} from "@/utils/token.utils";
import { verifyJWTToken } from "@/utils/token.utils";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const logoutHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ statusCode: 405, success: false, message: "Method not allowed" });
    return;
  }

  const token = getTokenCookie({ req, res });
  const data = verifyJWTToken(token as string) as JwtPayload;
  if (!data)
        return res
          .status(401)
          .json({ statusCode: 401, success: false, message: "Unauthorized" });
  if (!data?.sid)
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to logout",
    });
  try {
    const user = await prisma.student.update({
      where: {
        sid: data.sid,
      },
      data: {
        token: null,
      },
    });

    if (!user)
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Failed to logout",
      });

    deleteTokenCookie({ req, res });

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Logout successful",
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

export default logoutHandler;
