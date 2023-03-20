import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CourseList from "@/components/CourseList";
import { AllCoursesContext } from "@/context/AllCoursesContext";
import CourseListLoader from "@/components/CourseList/Skeleton";
import useAllCourses from "@/hooks/useAllCourses";

export default function SwipeableCourseList() {
  const [open, setOpen] = useState(false);
  const { allCourses } = useContext(AllCoursesContext);
  const { loading } = useAllCourses();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleDrawer}>
        <MenuIcon />
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Box
          sx={{ width: "auto", bgcolor: "background.paper", height: "100%" }}
          role="presentation"
        >
          {loading ? <CourseListLoader /> : <CourseList items={allCourses} />}
        </Box>
      </SwipeableDrawer>
    </>
  );
}
