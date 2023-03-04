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

export const autoRedirector = ({ ...args }: IOptions) => {
  const { req, res } = args;
  const token = getTokenCookie({ req, res }) || null;
  if (token) {
    let data: JwtPayload | null;
    try {
      data = verifyJWTToken(token as string) as JwtPayload;
    } catch (e) {
      data = null;
    }
    console.log(data);
    
    if (args.stayCondition === UserAuthState.AUTHORIZED)
      if (data?.sid)
        return {
          props: {
            sid: data.sid,
          },
        };
      else {
        return {
          redirect: {
            destination: args.to,
            permanent: false,
          },
        };
      }
    else if (args.stayCondition === UserAuthState.UNAUTHORIZED)
      if (data?.sid)
        return {
          redirect: {
            destination: args.to,
            permanent: false,
          },
          props: {
            sid: data.sid,
          },
        };
      else
        return {
          props: {},
        };
  }

  if (args.stayCondition === UserAuthState.AUTHORIZED)
    return {
      redirect: {
        destination: args.to,
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
