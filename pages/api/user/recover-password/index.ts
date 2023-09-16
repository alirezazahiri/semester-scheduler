import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma-singleton";
import bcrypt from "bcrypt";
import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import { JwtPayload } from "jsonwebtoken";



export default async function recoverPasswordHandler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "POST") {
      return res.status(403).json({
        message: "Method Not Allowed",
        success: false,
        statusCode: 403,
      });
    }
  
    const { newPassword, phoneNumber } = req.body as {
        newPassword: string;
        phoneNumber: string;
    };
  
    try {
      
      const user = await prisma.student.findFirst({
        where: {
          phoneNumber,
        },
      });

      
  
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
          success: false,
          statusCode: 404,
        });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      const updateUserResult = await prisma.student.update({
        where: {
          sid: user.sid,
        },
        data: {
          password: hashedPassword,
        },
      });
  
      if (!updateUserResult)
        return res.status(500).json({
          message: "Failed to update user",
          statusCode: 500,
          success: false,
        });
  
      return res.status(201).json({
        message: "password updated successfully",
        success: true,
        statusCode: 200,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change user's password",
        success: false,
        statusCode: 500,
      });
    }
  }
  