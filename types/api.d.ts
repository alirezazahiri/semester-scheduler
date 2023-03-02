import { NextApiRequest } from "next";

export interface IAuthenticatedRequest extends NextApiRequest {
  userId?: string;
  isLoggedIn?: boolean;
}

export type TCreateUser = { fullname: string; password: string; sid: string }
export type TLogin = { password: string; sid: string }