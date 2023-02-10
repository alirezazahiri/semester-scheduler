import React from "react";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext/index";
import Typography from "@mui/material/Typography";
import { getCourseWeeklyPlan } from "@/utils/selectedCourses.utils";
import { useEffect } from "react";
import { WeeklyPlanContext } from "@/context/WeeklyPlanContext";
import { TWeeklyPlan } from "@/types/plan";
import { Grid } from "@mui/material";
import DayRow from "./DayRow";
import {
  TABLE_HEADER_TIME_LIST,
  WEEK_DAYS_EN,
  WEEK_DAYS_FA,
} from "@/constants/index.constants";

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
        px: 0,
        py: 2,
        ml: 30,
      }}
      container
      // xs={12}
    >
      <Grid container>
        {TABLE_HEADER_TIME_LIST.map((time, idx) => (
          <Grid
            key={time}
            item
            xs={(1 / TABLE_HEADER_TIME_LIST.length) * 12}
            sx={{
              border:
                idx !== 0 ? "0.1px solid var(--border-primary-color)" : "none",
            }}
          >
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ textAlign: "center" }}
              color="primary.contrastText"
            >
              {time.split("-")[0]}
              <br />
              {time.split("-")[1]}
            </Typography>
          </Grid>
        ))}
      </Grid>
      {WEEK_DAYS_EN.map((day, index) => {
        return (
          <DayRow key={day} name={WEEK_DAYS_FA[index]} plan={weeklyPlan[day]} />
        );
      })}
    </Grid>
  );
}

export default ScheduleTable;
