import { IncomingMessage, ServerResponse } from "http";
import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import { JwtPayload } from "jsonwebtoken";

export interface IRedirector {
  req: IncomingMessage;
  res: ServerResponse;
}

export enum UserAuthState {
  UNAUTHORIZED = 0,
  AUTHORIZED = 1,
}

interface IOptions extends IRedirector {
  to: string;
  stayCondition: UserAuthState.AUTHORIZED | UserAuthState.UNAUTHORIZED;
}

/**
 * Redirects the user based on their authentication state
 * @param options An object containing the request, response, and redirect options
 * @returns An object with either the props or redirect destination
 */
export const autoRedirector = ({ ...options }: IOptions) => {
  const { req, res } = options;
  const token = getTokenCookie({ req, res }) || null;
  let data = token ? (verifyJWTToken(token as string) as JwtPayload) : null;

  if (options.stayCondition === UserAuthState.AUTHORIZED) {
    if (data?.sid) return { props: { sid: data.sid } };
    else return { redirect: { destination: options.to, permanent: false } };
  } else {
    if (data?.sid)
      return {
        redirect: { destination: options.to, permanent: false },
        props: { sid: data.sid },
      };
    else return { props: {} };
  }
};
