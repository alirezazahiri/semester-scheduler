import { PHONE_NUMBER_REGEX } from "@/utils/phoneNumber.utils";
import prisma from "@/utils/prisma-singleton";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getOTPhandler(
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

    const { phoneNumber } = req.body;

    if (!PHONE_NUMBER_REGEX.test(phoneNumber))
      return res.status(403).json({
        message: "phone number is invalid",
        success: false,
        statusCode: 403,
      });

    let dedicatedOTP = await prisma.oTP.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (!dedicatedOTP)
      dedicatedOTP = await prisma.tempOtp.findFirst({
        where: {
          phoneNumber,
        },
      });

    if (!dedicatedOTP) {
      return res.status(404).json({
        message: "OTP code not found!",
        statusCode: 404,
        success: false,
      });
    }

    const { expiresIn } = dedicatedOTP;

    return res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      otp: {
        expiresIn,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}
