import ChosenCoursesTable from "@/components/ChosenCoursesTable";
import useAllCourses from "@/hooks/useAllCourses";
import { Box, CircularProgress } from "@mui/material";
import Head from "next/head";
import React from "react";

function ChosenCoursesPage() {
  const { loading } = useAllCourses();
  return (
    <>
      <Head>
        <title>مشاهده دروس انتخاب شده | دانشگاه صنعتی نوشیروانی بابل</title>
        <meta
          name="description"
          content="در این صفحه میتوانید به مشاهده دروس انتخاب شده و همچنین تعداد واحد های اخذ شده بپردازید"
        />
      </Head>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "background.default",
          pt: 8,
        }}
      >
        {loading ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ChosenCoursesTable />
        )}
      </Box>
    </>
  );
}

export default ChosenCoursesPage;
