import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { NextApiHandler, NextApiResponse } from "next";
import { IAuthenticatedRequest } from "@/types/api";

const prisma = new PrismaClient();

const checkLoginMiddleware = (handler: NextApiHandler) => {
  return async (req: IAuthenticatedRequest, res: NextApiResponse) => {
    try {
      console.log(req.userId, req.isLoggedIn);

      req.userId = "";
      req.isLoggedIn = false;

      let token: string | null;
      // const { headers } = req;
      // token = headers?.authorization?.split(" ")[1] || null;
      token = getTokenCookie({ req, res }) as string;
      console.log(token);

      if (!token)
        return res.status(401).json({
          success: false,
          message: "Please login to your account",
          statusCode: 401,
        });

      const payload = verifyJWTToken(token);
      console.log(payload);

      const user = await prisma.student.findFirst({
        where: {
          sid: (payload as JwtPayload).sid,
        },
        select: {
          sid: true,
        },
      });

      if (!user)
        return res.status(401).json({
          success: false,
          message: "Please login to your account",
          statusCode: 401,
        });

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
