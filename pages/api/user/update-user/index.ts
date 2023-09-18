import { NextApiHandler } from "next";
import prisma from "@/utils/prisma-singleton";
import { updateProfileSchema } from "@/utils/validator";
import {
  deleteTokenCookie,
  getTokenCookie,
  verifyJWTToken,
} from "@/utils/token.utils";
import { JwtPayload } from "jsonwebtoken";
import { Student } from "@prisma/client";

const createUserHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "PATCH") {
    res
      .status(405)
      .json({ statusCode: 405, success: false, message: "Method not allowed" });
    return;
  }

  const { sid, name, collegeId, gender } = req.body;

  let token = getTokenCookie({ req, res });
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

  const { sid: currentSid } = data;

  try {
    const userExists = await prisma.student.findUnique({
      where: {
        sid,
      },
    });

    if (userExists && sid !== currentSid)
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: "user already exists",
      });

    const validation = await updateProfileSchema.safeParseAsync({
      sid: sid.trim(),
      name: name.trim(),
      collegeId,
      gender,
    });

    if (!validation.success)
      return res.status(402).json({
        statusCode: 401,
        success: false,
        message: "invalid data",
      });

    const {
      name: currentName,
      collegeId: currentCollegeId,
      gender: currentGender,
    } = userExists as Student;

    if (
      currentName.trim() === name.trim() &&
      currentCollegeId === collegeId &&
      currentGender === gender &&
      currentSid.trim() === sid.trim()
    )
      return res.status(400).json({
        statusCode: 400,
        success: true,
        message: "No Changes Applied!",
      });

    await prisma.student.update({
      data: {
        sid: sid.trim(),
        name: name.trim(),
        collegeId,
        gender,
      },
      where: {
        sid: currentSid,
      },
    });

    deleteTokenCookie({ req, res });

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "success",
      data: {
        sid,
        collegeId,
        name,
        gender,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error: Failed to sign up",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default createUserHandler;
