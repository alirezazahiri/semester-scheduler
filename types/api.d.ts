import { NextApiRequest } from "next";

export interface IAuthenticatedRequest extends NextApiRequest {
  userId?: string;
  isLoggedIn?: boolean;
}

