import React from "react";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext/index";
import Typography from "@mui/material/Typography";
import { getCourseWeeklyPlan } from "@/utils/selectedCourses.utils";
import { useEffect } from "react";
import { WeeklyPlanContext } from "@/context/WeeklyPlanContext";
import { TWeeklyPlan } from "@/types/plan";
import { Box } from "@mui/material";

const WEEK_DAYS_EN = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
const WEEK_DAYS_FA = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

function ScheduleTable() {
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { weeklyPlan, setWeeklyPlan } = useContext(WeeklyPlanContext);

  useEffect(() => {
    const coursePlans = selectedCourses.map((course) =>
      getCourseWeeklyPlan(course)
    );
    const week: TWeeklyPlan = {};
    for (const coursePlan of coursePlans) {
      for (const dayPlan of coursePlan) {
        const { day, courseName, time, courseID } = dayPlan;
        week[day] = [...(week[day] || []), { courseID, courseName, time }];
      }
    }
    setWeeklyPlan(week);
  }, [selectedCourses]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        px: 0,
        py: 2,
        ml: 30,
      }}
    >
      {WEEK_DAYS_EN.map((day, index) => {
        return (
          <Box
            key={day}
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography component="h1" variant="h5">{WEEK_DAYS_FA[index]}</Typography>
            {weeklyPlan[day]?.map(({ time, courseName, courseID }) => {
              return (
                <Box
                  key={courseID}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h5>{courseName}</h5>
                  <p>
                    {time.from} - {time.to}
                  </p>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}

export default ScheduleTable;
