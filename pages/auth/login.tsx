import LoginForm from "@/components/LoginForm";
import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import { GetServerSideProps } from "next";
import { Grid } from "@mui/material";
import React from "react";
import { JwtPayload } from "jsonwebtoken";
import { IncomingMessage, ServerResponse } from "http";

const LoginPage = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100vh",
      }}
    >
      <LoginForm />
    </Grid>
  );
};

export const getServerSideProps = ({ req, res }: {req: IncomingMessage, res: ServerResponse}) => {
  const token = getTokenCookie({ req, res }) || null;
  if (token) {
    let data: JwtPayload | null;
    try {
      data = verifyJWTToken(token as string) as JwtPayload;
    } catch (e) {
      data = null;
    }
    if (data?.sid)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  }
  return {
    props: {}
  }
};

export default LoginPage;
