import { NextApiRequest } from "next";

export interface IAuthenticatedRequest extends NextApiRequest {
  userId?: string;
  isLoggedIn?: boolean;
}

export type TUser = { fullname: string; password: string; sid: string }