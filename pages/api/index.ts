import checkLoginMiddleware from "@/utils/checkLogin";
import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "@/types/api";

const handler = async (req: IAuthenticatedRequest, res: NextApiResponse) => {
  try {
    res
      .status(200)
      .json({ message: "success", statusCode: 200 });
  } catch (err) {
    res.status(404).json({ message: "not-found", statusCode: 404 });
  } finally {
    res.end();
  }
};

export default checkLoginMiddleware(handler);
