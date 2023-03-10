import checkLoginMiddleware from "@/utils/checkLogin";
import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "@/types/api";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: IAuthenticatedRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET")
      return res.status(405).json({
        statusCode: 405,
        success: false,
        message: "Method not allowed",
      });
      
    const user = await prisma.student.findUnique({
      where: {
        sid: req.userId,
      },
      select: {
        sid: true,
        name: true,
        collegeId: true,
        token: true,
      },
    });

    if (!user)
      return res.status(404).json({
        statusCode: 404,
        message: "NOT FOUND",
        success: false,
      });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "success",
      userId: req.userId,
      isLoggedIn: req.isLoggedIn,
      user,
    });
  } catch (err) {
    res
      .status(404)
      .json({ statusCode: 404, success: false, message: "not-found" });
  } finally {
    res.end();
  }
};

export default checkLoginMiddleware(handler);
