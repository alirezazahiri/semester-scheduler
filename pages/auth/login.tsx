import LoginForm from "@/components/LoginForm";
import { Grid } from "@mui/material";
import React from "react";
import { autoRedirector } from "@/utils/autoRedirector";
import { IRedirector, UserAuthState } from '@/utils/autoRedirector';
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
    <Head>
      <title>ورود به حساب کاربری | دانشگاه صنعتی نوشیروانی بابل</title>
      <meta name='description' content='به حساب کاربری خود جهت استفاده از برنامه وارد شوید' />
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
      <LoginForm />
    </Grid>
    </>
  );
};

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({ req, res, to: "/", stayCondition: UserAuthState.UNAUTHORIZED });

export default LoginPage;
