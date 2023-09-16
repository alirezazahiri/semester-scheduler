import { NextApiHandler } from "next";
import prisma from "@/utils/prisma-singleton";
import bcrypt from "bcrypt";




const createUserHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ statusCode: 405, success: false, message: "Method not allowed" });
    return;
  }

  const { sid, name, password, collegeId, gender } = req.body;

  try {
    const userExists = await prisma.student.findUnique({
      where: {
        sid,
      },
    });

    if (userExists)
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: "user already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.student.create({
      data: {
        sid: sid.trim(),
        name: name.trim(),
        collegeId,
        password: hashedPassword,
        gender,
      },
    });

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
