import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUserHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { sid, name, email, password } = req.body;

  try {
    const userExists = await prisma.student.findFirst({
      where: {
        OR: [{ sid }, { email }],
      },
    });

    if (userExists)
      return res
        .status(500)
        .json({ message: "user already exists", statusCode: 500 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.student.create({
      data: {
        sid,
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      statusCode: 201,
      message: "success",
      data: {
        sid,
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error: Failed to sign up",
      statusCode: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default createUserHandler;
