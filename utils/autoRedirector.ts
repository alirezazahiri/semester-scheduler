import { IncomingMessage, ServerResponse } from "http";
import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import { JwtPayload } from "jsonwebtoken";
import { GetServerSideProps } from "next";

export interface IRedirector {
  req: IncomingMessage;
  res: ServerResponse;
  resolvedUrl?: string;
  checkPhone?: boolean;
  props?: object;
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
  const { req, res, props } = options;
  const token = getTokenCookie({ req, res }) || null;
  let data = token ? (verifyJWTToken(token as string) as JwtPayload) : null;

  if (options.stayCondition === UserAuthState.AUTHORIZED) {
    if (data?.sid) {
      if (options.checkPhone)
        if (!data?.phoneNumber)
          if (options.resolvedUrl !== "/auth/confirm-phone-number")
            return {
              redirect: {
                destination: "/auth/confirm-phone-number",
                permanent: false,
              },
            };
      if (data?.phoneNumber)
        if (options.resolvedUrl === "/auth/confirm-phone-number")
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
      return { props: { sid: data.sid, ...props } };
    }
    return { redirect: { destination: options.to, permanent: false } };
  } else {
    if (data?.sid)
      return {
        redirect: { destination: options.to, permanent: false },
        props: { sid: data.sid, ...props },
      };
    else return { props: {} };
  }
};
