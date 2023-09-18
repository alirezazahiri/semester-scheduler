import Settings from "@/components/Settings";
import { IRedirector, UserAuthState, autoRedirector } from "@/utils/autoRedirector";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";

function SettingsPage() {
  return (
    <>
      <Head>
        <title>تنظیمات حساب کاربری | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="تنظیمات حساب کاربری"
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
