import jwt from "jsonwebtoken";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

const { JWT_SECRET } = process.env;
const TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

export const tokenGenerator = (payload: { sid: string, phoneNumber: string }) => {
  const { sid, phoneNumber } = payload;

  const token = jwt.sign({ sid, phoneNumber }, JWT_SECRET as string, {
    expiresIn: TOKEN_EXPIRES_IN,
  });

  return token;
};

export const verifyJWTToken = (token: string) => {
  try {
    const result = jwt.verify(token, JWT_SECRET as string);

    return result;
  } catch (_) {
    return false;
  }
};

export function setTokenCookie(token: string, options?: Partial<OptionsType>) {
  setCookie("token", token, {
    httpOnly: true,
    maxAge: TOKEN_EXPIRES_IN,
    sameSite: "strict",
    ...options,
  });
}

export function getTokenCookie(options?: Partial<OptionsType>) {
  return options?.req && options?.res
    ? getCookie("token", { req: options.req, res: options.res })
    : getCookie("token");
}

export function deleteTokenCookie(options?: Partial<OptionsType>) {
  return options?.req && options?.res
    ? deleteCookie("token", { req: options.req, res: options.res })
    : deleteCookie("token");
}
