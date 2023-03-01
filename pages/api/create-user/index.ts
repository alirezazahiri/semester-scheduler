import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUserHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ statusCode: 405, success: false, message: "Method not allowed" });
    return;
  }

  const { sid, name, password } = req.body;

  try {
    const userExists = await prisma.student.findFirst({
      where: {
        sid,
      },
    });

    if (userExists)
      return res
        .status(500)
        .json({
          statusCode: 500,
          success: false,
          message: "user already exists",
        });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.student.create({
      data: {
        sid,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      statusCode: 201,
      success: false,
      message: "success",
      data: {
        sid,
        name,
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
