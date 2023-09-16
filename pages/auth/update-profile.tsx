import UpdateProfileForm from "@/components/UpdateProfileForm";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import { getTokenCookie, verifyJWTToken } from "@/utils/token.utils";
import { Grid } from "@mui/material";
import prisma from "@/utils/prisma-singleton";
import { JwtPayload } from "jsonwebtoken";
import Head from "next/head";
import React from "react";

interface Props {
  sid: string;
  name: string;
  collegeId: string;
  gender: string;
}



function UpdateProfilePage(initialFormData: Props) {
  return (
    <>
      <Head>
        <title>تغییر گذرواژه | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="در این صفحه میتوانید پروفایل خود را به روز رسانی کنید"
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
        <UpdateProfileForm initialFormData={initialFormData} />
      </Grid>
    </>
  );
}

export async function getServerSideProps({ req, res }: IRedirector) {
  const token = getTokenCookie({ req, res }) || null;
  let data = token ? (verifyJWTToken(token as string) as JwtPayload) : null;

  if (!data)
    return { redirect: { destination: "/auth/login", permanent: false } };

  const user = await prisma.student.findUnique({
    where: {
      sid: data.sid,
    },
    select: {
      name: true,
      collegeId: true,
      gender: true,
    },
  });

  return autoRedirector({
    req,
    res,
    stayCondition: UserAuthState.AUTHORIZED,
    to: "/auth/login",
    props: user ?? {},
  });
}

export default UpdateProfilePage;
