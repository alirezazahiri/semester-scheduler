import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function checkOTPhandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(403).json({
        message: "Method Not Allowed",
        success: false,
        statusCode: 403,
      });
    }

    const { phoneNumber, code } = req.body;

    let dedicatedOTP = await prisma.oTP.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (!dedicatedOTP) 
      dedicatedOTP = await prisma.tempOtp.findFirst({
        where: {
          phoneNumber
        }
      })

    if (!dedicatedOTP) {
      return res.status(404).json({
        message: "OTP code not found!",
        statusCode: 404,
        success: false,
      });
    }

    const { value, expiresIn } = dedicatedOTP;

    if (Number(expiresIn) < Date.now())
      return res.status(403).json({
        message: "OTP code expired",
        statusCode: 403,
        success: false,
      });

    if (value !== code)
      return res.status(403).json({
        message: "OTP code is wrong",
        statusCode: 403,
        success: false,
      });
    return res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}
