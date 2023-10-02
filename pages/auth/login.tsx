import LoginForm from "@/components/LoginForm";
import { Box, Grid } from "@mui/material";
import React from "react";
import { autoRedirector } from "@/utils/autoRedirector";
import { IRedirector, UserAuthState } from '@/utils/autoRedirector';
import Head from "next/head";
import HelpFab from "@/components/HelpFab";

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
    <Box
        sx={{
          display: "flex",
          width: "fit-content",
          position: "fixed",
          bottom: 16,
          right: 16,
          displayPrint: "none",
        }}
      >
        <HelpFab />
      </Box>
    </>
  );
};

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({ req, res, to: "/", stayCondition: UserAuthState.UNAUTHORIZED });

export default LoginPage;
