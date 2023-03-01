import checkLoginMiddleware from "@/utils/checkLogin";
import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "@/types/api";

const handler = async (req: IAuthenticatedRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "success",
      userId: req.userId,
      isLoggedIn: req.isLoggedIn,
    });
  } catch (err) {
    res
      .status(404)
      .json({ statusCode: 404, success: false, message: "not-found" });
  } finally {
    res.end();
  }
};

export default checkLoginMiddleware(handler);
