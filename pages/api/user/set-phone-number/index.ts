import { PHONE_NUMBER_REGEX } from "@/utils/phoneNumber.utils";
import {
  getTokenCookie,
  setTokenCookie,
  tokenGenerator,
  verifyJWTToken,
} from "@/utils/token.utils";
import prisma from "@/utils/prisma-singleton";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function setPhoneNumberHandler(
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

    if (!PHONE_NUMBER_REGEX.test(phoneNumber))
      return res.status(400).json({
        message: `phone number: ${phoneNumber} is invalid!`,
        statusCode: 400,
        success: false,
      });

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

    const { sid } = data;

    const user = await prisma.student.findFirst({
      where: {
        sid,
      },
    });

    if (!user)
      return res.status(404).json({
        message: "not-found",
        success: false,
        statusCode: 404,
      });

    token = tokenGenerator({ sid, phoneNumber });
    setTokenCookie(token, { req, res });
    const updateUserResult = await prisma.student.update({
      where: {
        sid,
      },
      data: {
        phoneNumber,
        token,
      },
    });

    if (!updateUserResult)
      return res.status(304).json({
        message: "failed to update user",
        statusCode: 304,
        success: false,
      });

    return res.status(201).json({
      message: "success",
      success: true,
      statusCode: 201,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      success: false,
    });
  }
}
