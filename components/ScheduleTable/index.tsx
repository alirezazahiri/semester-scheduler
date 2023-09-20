import React from "react";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { getCourseWeeklyPlan } from "@/utils/selectedCourses.utils";
import { useEffect } from "react";
import { WeeklyPlanContext } from "@/context/WeeklyPlanContext";
import { TWeeklyPlan } from "@/types/plan";
import { Grid, useTheme } from "@mui/material";
import DayRow from "./DayRow";
import { WEEK_DAYS_EN, WEEK_DAYS_FA } from "@/constants/index.constants";
import TableHeading from "./TableHeading";

function ScheduleTable() {
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { weeklyPlan, setWeeklyPlan } = useContext(WeeklyPlanContext);
  const theme = useTheme();
  useEffect(() => {
    const coursePlans = selectedCourses.map((course) =>
      getCourseWeeklyPlan(course)
    );
    const week: TWeeklyPlan = {};
    for (const coursePlan of coursePlans) {
      for (const dayPlan of coursePlan) {
        const {
          day,
          courseName,
          time,
          courseID,
          totalUnit,
          practicalUnit,
          professor,
          description,
        } = dayPlan;
        week[day] = [
          ...(week[day] || []),
          {
            courseID,
            courseName,
            time,
            practicalUnit,
            totalUnit,
            professor,
            description,
          },
        ];
      }
    }
    setWeeklyPlan(week);
  }, [selectedCourses]);

  return (
    <Grid
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-around",
        px: 0,
        py: 2,
        [theme.breakpoints.down("md")]: {
          minWidth: "1024px",
          px: 2,
        },
      }}
      container
    >
      <TableHeading />
      {WEEK_DAYS_EN.map((day, index) => {
        return (
          <DayRow key={day} name={WEEK_DAYS_FA[index]} plan={weeklyPlan[day]} />
        );
      })}
    </Grid>
  );
}

export default ScheduleTable;
