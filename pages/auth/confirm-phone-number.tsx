import Head from 'next/head'
import React from 'react'
import { Grid } from '@mui/material';
import ConfirmPhoneNumber from '@/components/ConfirmPhoneNumber';
import { IRedirector, UserAuthState, autoRedirector } from '@/utils/autoRedirector';

function ConfirmPhoneNumberPage() {
  return (
    <>
    <Head>
      <title>بازیابی گذرواژه | دانشگاه صنعتی نوشیروانی بابل</title>
      <meta name='description' content="برای استفاده از حساب کاربری خود باید ابتدا شماره تلفن همراه خود را تایید نمایید" />
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
      <ConfirmPhoneNumber />
    </Grid>
    </>
  )
}

export const getServerSideProps = ({ req, res, resolvedUrl }: IRedirector) =>
  autoRedirector({ req, res, to: "/", stayCondition: UserAuthState.AUTHORIZED, resolvedUrl });


export default ConfirmPhoneNumberPage