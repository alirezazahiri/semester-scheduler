import SignupForm from "@/components/SignupForm";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>ساخت حساب کاربری | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="یک حساب کاربری جهت شروع کار با برنامه برای خود بسازید"
        />
      </Head>
      <Grid
        container
        sx={{
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "100vh",
        }}
      >
        <SignupForm />
      </Grid>
    </>
  );
};

export default SignUpPage;
