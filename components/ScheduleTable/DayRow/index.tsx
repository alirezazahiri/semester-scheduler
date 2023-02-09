import { TABLE_HEADER_TIME_LIST } from "@/constants/index.constants";
import type { TDailyPlan } from "@/types/plan";
import calculateDayRow from "@/utils/calculateDayRow";
import getTimeScale from "@/utils/getTimeScale";
import sortedPlan from "@/utils/sortDailyPlan";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface IProps {
  name: string;
  plan: TDailyPlan[];
}

function DayRow({ name, plan }: IProps) {
  console.log(name);
  return (
    <Grid
      container
      xs={12}
      sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
    >
      <Grid item xs={(1 / (TABLE_HEADER_TIME_LIST.length)) * 12}>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>
      </Grid>

      <Grid
        container
        xs={
          (((TABLE_HEADER_TIME_LIST.length - 1) /
            (TABLE_HEADER_TIME_LIST.length))) *
          12
        }
        sx={{ minHeight: 90, border: "1px solid var(--border-primary-color)" }}
      >
        {calculateDayRow(plan)?.map(
          ({ time, courseName, courseID, totalUnit, practicalUnit }) => {
            return courseName === "NOT_A_COURSE" ? (
              <Grid
                key={courseID}
                item
                xs={
                  (((totalUnit - practicalUnit) * 0.5 + practicalUnit * 2) /
                    (TABLE_HEADER_TIME_LIST.length - 1)) *
                  12
                }
                sx={{
                  border: "1px solid var(--border-primary-color)",
                }}
              ></Grid>
            ) : (
              <Grid
                key={courseID}
                item
                xs={
                  (((totalUnit - practicalUnit) * 0.5 + practicalUnit * 2) /
                    (TABLE_HEADER_TIME_LIST.length - 1)) *
                  12
                }
                sx={{
                  border: "1px solid var(--border-primary-color)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Typography component="p" variant="body1">
                  {courseName}
                </Typography>
                <Typography component="p" variant="subtitle2">
                  {time.from} - {time.to}
                </Typography>
              </Grid>
            );
          }
        )}
      </Grid>
    </Grid>
  );
}

export default DayRow;
