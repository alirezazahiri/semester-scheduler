import Head from "next/head";
import { FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

interface Props {}

const NotFoundPage: FC<Props> = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>برنامه پیش ثبت نام | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta name="description" content="صفحه مورد نظر وجود ندارد" />
      </Head>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "background.default",
          pt: 8,
        }}
      >
        <Typography
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="h1"
          variant="h3"
          color="primary"
        >
          صفحه مورد نظر پیدا نشد :(
          <Button
            sx={{
              mt: 2,
            }}
            onClick={() => {
              router.push("/");
            }}
            color="primary"
          >
            بازگشت به صفحه اصلی
          </Button>
        </Typography>
      </Box>
    </>
  );
};

export default NotFoundPage;
