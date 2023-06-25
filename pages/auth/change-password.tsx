import ChangePasswordForm from "@/components/ChangePasswordForm";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";

function ChangePasswordPage() {
  return (
    <>
      <Head>
        <title>تغییر گذرواژه | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="در این صفحه میتوانید اقدام به تغییر گذرواژه خود کنید"
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
        <ChangePasswordForm />
      </Grid>
    </>
  );
}

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({
    req,
    res,
    to: "/",
    stayCondition: UserAuthState.AUTHORIZED,
  });

export default ChangePasswordPage;
