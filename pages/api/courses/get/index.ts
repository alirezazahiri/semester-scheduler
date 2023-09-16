import { NextApiHandler } from "next";
import prisma from "@/utils/prisma-singleton";
import { getTokenCookie } from "@/utils/token.utils";
import { JwtPayload } from "jsonwebtoken";
import { verifyJWTToken } from "@/utils/token.utils";



const saveCoursesHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
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
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: "Not Allowed",
    });
  try {
    const result = await prisma.course.findMany({
      where: {
        sid: data.sid,
      },
      select: {
        courseId: true,
      },
    });

    if (!result)
      return res.status(500).json({
        statusCode: 500,
        success: false,
        message: "Failed to save courses",
      });

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "success",
      data: result.map((item) => item.courseId),
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Failed to save courses",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default saveCoursesHandler;
