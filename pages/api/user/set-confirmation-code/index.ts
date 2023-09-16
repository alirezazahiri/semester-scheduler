import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import prisma from "@/utils/prisma-singleton";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { generateOTP } from "@/utils/otp.utils";
import { sendMessage } from "@/services/textMessage.service";
import { PHONE_NUMBER_REGEX } from "@/utils/phoneNumber.utils";



export default async function setConfirmationCodeHandler(
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

    const { phoneNumber } = req.body;
    

    if (!PHONE_NUMBER_REGEX.test(phoneNumber))
      return res.status(400).json({
        statusCode: 400,
        message: "Phone Number is invalid",
        success: false,
      });

    const user = await prisma.student.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "Account with the given phone number already exists",
        statusCode: 400,
        success: false,
      });
    }

    const currentOtp = await prisma.tempOtp.findFirst({
      where: {
        phoneNumber,
      },
    });

    if (Number(currentOtp?.expiresIn) >= Date.now())
      return res.status(403).json({
        message: "current otp code hasn't expired yet.",
        statusCode: 403,
        success: false,
        otp: {
          expiresIn: currentOtp?.expiresIn,
        },
      });

    const generatedOTP = generateOTP(4);

    try {
      await prisma.tempOtp.upsert({
        where: {
          phoneNumber,
        },
        create: {
          phoneNumber,
          expiresIn: new Date(generatedOTP.expiresIn),
          value: generatedOTP.otp,
        },
        update: {
          phoneNumber,
          expiresIn: new Date(generatedOTP.expiresIn),
          value: generatedOTP.otp,
        },
      });
    } catch (err) {
      return res.status(304).json({
        statusCode: 304,
        message: "failed to create otp code!",
        success: false,
      });
    }

    sendMessage(generatedOTP.otp);

    return res.status(201).json({
      message: "success",
      success: true,
      statusCode: 201,
      otp: {
        expiresIn: generatedOTP.expiresIn,
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
