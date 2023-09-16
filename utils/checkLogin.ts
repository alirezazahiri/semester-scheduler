import {
  deleteTokenCookie,
  getTokenCookie,
  verifyJWTToken,
} from "@/utils/token.utils";
import prisma from "@/utils/prisma-singleton";
import { JwtPayload } from "jsonwebtoken";
import { NextApiHandler, NextApiResponse } from "next";
import { IAuthenticatedRequest } from "@/types/api";



const checkLoginMiddleware = (handler: NextApiHandler) => {
  return async (req: IAuthenticatedRequest, res: NextApiResponse) => {
    try {
      req.userId = "";
      req.isLoggedIn = false;

      let token: string | null;
      // const { headers } = req;
      // token = headers?.authorization?.split(" ")[1] || null;
      token = getTokenCookie({ req, res }) as string;

      if (!token)
        return res.status(401).json({
          success: false,
          message: "Please login to your account",
          statusCode: 401,
        });

      const payload = verifyJWTToken(token);

      if (!payload)
        return res
          .status(401)
          .json({ statusCode: 401, success: false, message: "Unauthorized" });
      const user = await prisma.student.findFirst({
        where: {
          sid: (payload as JwtPayload).sid,
        },
        select: {
          sid: true,
          token: true,
        },
      });

      if (!user)
        return res.status(401).json({
          success: false,
          message: "Please login to your account",
          statusCode: 401,
        });

      if (user.token) {
        if (user.token !== token) {
          deleteTokenCookie({ req, res });
          return res.status(403).json({
            success: false,
            message: "Another device is currently active in your account",
            statusCode: 403,
          });
        }
      }

      req.userId = user.sid;
      req.isLoggedIn = true;

      return handler(req, res);
    } catch (e) {
      console.error(e);
      return res.status(401).json({
        success: false,
        message: "Please login to your account",
        statusCode: 401,
      });
    }
  };
};

export default checkLoginMiddleware;
