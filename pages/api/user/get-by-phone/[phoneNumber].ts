import { PHONE_NUMBER_REGEX } from "@/utils/phoneNumber.utils";
import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import prisma from "@/utils/prisma-singleton";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";



export default async function getUserByPhoneNumber(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET")
      return res.status(405).json({
        statusCode: 405,
        success: false,
        message: "Method not allowed",
      });

    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(404).json({
        statusCode: 404,
        message: "NOT FOUND",
        success: false,
      });
    }

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

    const user = await prisma.student.findFirst({
      where: {
        phoneNumber: phoneNumber as string,
      },
    });

    if (!user)
      return res.status(404).json({
        statusCode: 404,
        message: "NOT FOUND",
        success: false,
      });

    if (user.phoneNumber !== data.phoneNumber)
      return res.status(403).json({
        message: "phone number invalid",
        statusCode: 403,
        success: false,
      });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "success",
      phoneNumber,
    });
  } catch (err) {
    res
      .status(404)
      .json({ statusCode: 404, success: false, message: "not-found" });
  }
}
