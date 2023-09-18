import { sendMessage } from "@/services/textMessage.service";
import { generateOTP } from "@/utils/otp.utils";
import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import prisma from "@/utils/prisma-singleton";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function setOtpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PATCH") {
      return res.status(403).json({
        message: "Method Not Allowed",
        success: false,
        statusCode: 403,
      });
    }

    const { phoneNumber } = req.body;

    const token = getTokenCookie({ req, res });
    const data = verifyJWTToken(token as string) as JwtPayload;

    if (data) {
      if (phoneNumber !== data.phoneNumber)
        return res.status(400).json({
          message: "phone number is wrong",
          statusCode: 400,
          success: false,
        });
    }
    const user = await prisma.student.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "not-found",
        statusCode: 404,
        success: false,
      });
    }

    const currentOtp = await prisma.oTP.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (Number(currentOtp?.expiresIn) >= Date.now())
      return res.status(402).json({
        message: "current otp code hasn't expired yet.",
        statusCode: 402,
        success: false,
      });

    const { otp: code, expiresIn } = generateOTP(4);

    const setUserOTPResult = await prisma.student.update({
      where: {
        sid: user.sid,
      },
      data: {
        otp: {
          upsert: {
            create: { value: code, expiresIn: new Date(expiresIn) },
            update: {
              value: code,
              expiresIn: new Date(expiresIn),
            },
          },
        },
      },
    });

    if (!setUserOTPResult) {
      return res.status(500).json({
        message: "Internal Server Error",
        statusCode: 500,
        success: false,
      });
    }

    sendMessage(code);

    return res.status(201).json({
      message: "otp created successfully!",
      success: true,
      statusCode: 201,
      otp: code,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}
