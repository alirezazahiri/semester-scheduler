import PasswordRecovery from "@/components/PasswordRecovery";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";

function PasswordRecoveryPage() {
  return (
    <>
      <Head>
        <title>بازیابی گذرواژه | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="اگر گذرواژه خود را فراموش کرده اید، با ورود شماره تلفن خود میتوانید آن را بازیابی کنید"
        />
      </Head>
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
        <PasswordRecovery />
      </Grid>
    </>
  );
}

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({
    req,
    res,
    to: "/auth/login",
    checkPhone: true,
    stayCondition: UserAuthState.AUTHORIZED,
  });

export default PasswordRecoveryPage;
