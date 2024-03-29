import { TABLE_HEADER_TIME_LIST } from "@/constants/index.constants";
import type { TDailyPlan } from "@/types/plan";
import calculateDayRow from "@/utils/calculateDayRow";
import { Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { e2p } from "@/utils/numbers";
import { useTheme } from "@mui/material/styles";

interface IProps {
  name: string;
  plan: TDailyPlan[];
}

function DayRow({ name, plan }: IProps) {
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );
  const removeSelectedCourse = (cid: string) => {
    setSelectedCourses(selectedCourses?.filter((c) => c.courseID !== cid));
  };
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
    >
      <Grid
        item
        xs={(1 / TABLE_HEADER_TIME_LIST.length) * 12}
        sx={{
          border: "1px solid var(--border-primary-color)",
          height: "100%",
          pr: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography
          component="h1"
          variant="subtitle1"
          sx={{
            textAlign: "right",
            fontSize: "17px",
            wordBreak: "break-word",
            [theme.breakpoints.down("lg")]: {
              fontSize: "14px",
            },
          }}
        >
          {name}
        </Typography>
      </Grid>

      <Grid
        item
        xs={
          ((TABLE_HEADER_TIME_LIST.length - 1) /
            TABLE_HEADER_TIME_LIST.length) *
          12
        }
        sx={{
          minHeight: 90,
          border: "1px solid var(--border-primary-color)",
          display: "flex",
        }}
      >
        {calculateDayRow(plan, name)?.map(
          ({
            time,
            courseName,
            courseID,
            professor,
            description,
            timeScale,
          }) => {
            return courseName === "NOT_A_COURSE" ? (
              <Grid
                key={courseID}
                item
                xs={(timeScale / (TABLE_HEADER_TIME_LIST.length - 1)) * 12}
                sx={{
                  border: "none",
                }}
              ></Grid>
            ) : (
              <Tooltip title={description} key={courseID} arrow followCursor>
                <Grid
                  item
                  xs={(timeScale / (TABLE_HEADER_TIME_LIST.length - 1)) * 12}
                  sx={{
                    border: "1px solid var(--border-primary-color)",
                    borderBottom: "none",
                    borderTop: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    cursor: "pointer",
                    wordBreak: "break-word",
                  }}
                  onClick={() => removeSelectedCourse(courseID)}
                >
                  <Typography
                    component="p"
                    variant="body1"
                    color="primary.contrastText"
                    fontSize="12px"
                    mx={1}
                  >
                    {`${e2p(courseName)} (گروه ${e2p(courseID.split("_")[1])})`}
                  </Typography>
                  <Typography
                    component="p"
                    variant="body2"
                    color="primary.light"
                  >
                    {professor}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    color="primary.contrastText"
                  >
                    {e2p(time.from)} تا {e2p(time.to)}
                  </Typography>
                </Grid>
              </Tooltip>
            );
          }
        )}
      </Grid>
    </Grid>
  );
}

export default DayRow;
