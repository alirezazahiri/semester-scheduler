import React from "react";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
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

interface IProps {
  mt: number | string;
  fullWidth: boolean;
}

function ScheduleTable({ mt, fullWidth }: Partial<IProps>) {
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
        mt: mt ? mt : 0,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-around",
        px: 0,
        py: 2,
        ml: fullWidth ? 0 : 30,
        width: fullWidth ? "100%" : 1140,
      }}
      container
    >
      {TABLE_HEADER_TIME_LIST.map((time, idx) => (
        <Grid
          key={time}
          item
          xs={(1 / TABLE_HEADER_TIME_LIST.length) * 12}
          sx={{
            border: "0.1px solid var(--border-primary-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {idx !== 0 ? (
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
          ) : (
            <Typography
              component="p"
              variant="subtitle2"
              fontSize="14px"
              color="primary.contrastText"
            >
              {time}
            </Typography>
          )}
        </Grid>
      ))}
      {WEEK_DAYS_EN.map((day, index) => {
        return (
          <DayRow key={day} name={WEEK_DAYS_FA[index]} plan={weeklyPlan[day]} />
        );
      })}
    </Grid>
  );
}

export default ScheduleTable;
