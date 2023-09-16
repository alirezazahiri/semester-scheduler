import Settings from "@/components/Settings";
import { IRedirector, UserAuthState, autoRedirector } from "@/utils/autoRedirector";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";

function SettingsPage() {
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
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Settings />
      </Grid>
    </>
  );
}

export default SettingsPage;

export const getServerSideProps = ({ req, res }: IRedirector) => {
  return autoRedirector({
    req,
    res,
    stayCondition: UserAuthState.AUTHORIZED,
    to: "/",
  });
};
