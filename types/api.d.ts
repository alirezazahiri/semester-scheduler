import { NextApiRequest } from "next";

export interface IAuthenticatedRequest extends NextApiRequest {
  userId?: string;
  isLoggedIn?: boolean;
}

export type TCreateUser = {
  name: string;
  password: string;
  sid: string;
  collegeId: string;
};
export type TLogin = { password: string; sid: string };
