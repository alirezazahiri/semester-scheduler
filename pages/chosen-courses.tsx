import ChosenCoursesTable from "@/components/ChosenCoursesTable";
import useAllCourses from "@/hooks/useAllCourses";
import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";

function ChosenCoursesPage() {
    useAllCourses()
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
        //   px: 4,
          pt: 8,
        }}
      >
        <ChosenCoursesTable />
      </Box>
    </>
  );
}

export default ChosenCoursesPage;
