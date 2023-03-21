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
  gender: string;
};

export type TLogin = { password: string; sid: string };

export type TCreateUserFormValue = {
  name: string;
  collegeId: string;
  sid: string;
  password: string;
  gender: string;
};

export type TLoginUserFormValue = {
  sid: string;
  password: string;
};
