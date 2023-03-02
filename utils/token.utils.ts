import jwt from "jsonwebtoken";
import { setCookie, getCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

const { JWT_SECRET } = process.env;
const TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7;

export const tokenGenerator = (payload: { sid: string }) => {
  const { sid } = payload;

  const token = jwt.sign({ sid }, JWT_SECRET || "1234", {
    expiresIn: TOKEN_EXPIRES_IN,
  });

  return token;
};

export const verifyJWTToken = (token: string) => {
  try {
    const result = jwt.verify(token, JWT_SECRET || "1234");

    return result;
  } catch (_) {
    throw {
      status: 401,
      success: false,
      message: "Faild to login! try again!",
    };
  }
};

export function setTokenCookie(token: string, options?: Partial<OptionsType>) {
  if (options?.req && options?.res)
    setCookie("token", token, {
      httpOnly: true,
      maxAge: TOKEN_EXPIRES_IN,
      sameSite: "strict",
      ...options,
    });
  else
    setCookie("token", token, {
      httpOnly: true,
      maxAge: TOKEN_EXPIRES_IN,
      sameSite: "strict",
      ...options,
    });
}

export function getTokenCookie(options?: Partial<OptionsType>) {
  return options?.req && options?.res
    ? getCookie("token", { req: options?.req, res: options?.res })
    : getCookie("token");
}
