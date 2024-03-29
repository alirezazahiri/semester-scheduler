import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { TCourse } from "@/types/courses";
import { Box, Tooltip } from "@mui/material";
import { useContext } from "react";
import { WeeklyPlanContext } from "@/context/WeeklyPlanContext";
import sortedPlan from "@/utils/sortDailyPlan";
import { isInterfering } from "@/utils/calculateDayRow";
import showToast from "@/utils/showToast";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { WEEK_DAYS_DICTIONARY } from "@/constants/index.constants";
import { Days } from "@types";
import { e2p } from "@/utils/numbers";

interface IProps {
  item: TCourse;
  handleToggle: (id: string) => void;
  checked: boolean;
}

function CourseListItem({ item, handleToggle, checked }: IProps) {
  const { weeklyPlan } = useContext(WeeklyPlanContext);
  const { selectedCourses } = useContext(SelectedCoursesContext);

  const toggleCaller = () => {
    if (selectedCourses.find((c) => c.courseID === item.courseID)) {
      return handleToggle(item.courseID);
    }
    const examInterferingCourses = [];
    let examInterferingDate = "";
    for (const selectedCourse of selectedCourses) {
      if (selectedCourse.dateAndTime.exam && item.dateAndTime?.exam) {
        const courseExamDateTime = selectedCourse.dateAndTime.exam as {
          date: string;
          time: string;
        };
        const itemExamDateTime = item.dateAndTime.exam as {
          date: string;
          time: string;
        };
        examInterferingDate = itemExamDateTime.date;
        if (courseExamDateTime.date == itemExamDateTime.date) {
          if (isInterfering(itemExamDateTime.time, courseExamDateTime.time)) {
            examInterferingCourses.push(
              `${e2p(selectedCourse.courseName)} (گروه ${e2p(
                selectedCourse.courseID.split("_")[1]
              )})`
            );
          }
        }
      }
    }

    const days = Object.keys(weeklyPlan);
    let interferenceDays = [];
    let interferenceCourses = [];
    for (const day of days) {
      const sorted = sortedPlan(weeklyPlan[day]);
      for (let i = 0; i < sorted.length; i++) {
        const currentItemTime = item.dateAndTime[day] as {
          from: string;
          to: string;
        };
        if (currentItemTime) {
          const comparableTime = `${currentItemTime.from}-${currentItemTime.to}`;
          if (
            isInterfering(
              comparableTime,
              `${sorted[i].time.from}-${sorted[i].time.to}`
            )
          ) {
            interferenceDays.push(day);
            interferenceCourses.push(
              `${sorted[i].courseName} (گروه ${
                sorted[i].courseID.split("_")[1]
              })`
            );
            interferenceCourses.push(
              `${item.courseName} (گروه ${item.courseID.split("_")[1]})`
            );
          }
        }
      }
    }

    if (interferenceDays.length > 0) {
      const interferingCourses = [...new Set(interferenceCourses)];
      const message = (
        <p>
          تداخل زمان برگزاری کلاس درس های{" "}
          {interferingCourses.map((c, i, a) => (
            <>
              <Box component="span" sx={{ color: "primary.main" }}>
                {c}
              </Box>
              {a.length > 1 && i !== a.length - 1 ? " و " : ""}
            </>
          ))}{" "}
          در روز
          {interferenceDays.length >= 2 ? "های" : ""}{" "}
          {interferenceDays.map((d, i, a) => (
            <>
              <Box component="span" sx={{ color: "secondary.main" }}>
                {WEEK_DAYS_DICTIONARY[d as Days]}
              </Box>
              {a.length > 1 && i !== a.length - 1 ? " و " : ""}
            </>
          ))}
        </p>
      );
      showToast(message, "error", 3000);
    } else if (examInterferingCourses.length) {
      const message = (
        <p>
          تداخل امتحانات درس های{" "}
          {
            <Box component="span" sx={{ color: "primary.main" }}>
              {`${e2p(item.courseName)} (گروه ${e2p(
                item.courseID.split("_")[1]
              )})`}
            </Box>
          }{" "}
          {" و "}
          {examInterferingCourses.map((eic, i, a) => (
            <>
              <Box component="span" sx={{ color: "primary.main" }}>
                {eic}
              </Box>
              {a.length > 1 && i !== a.length - 1 ? " و " : ""}
            </>
          ))}{" "}
          در تاریخ{" "}
          <Box component="span" sx={{ color: "secondary.main" }}>
            {e2p(examInterferingDate.replaceAll(".", "/"))}
          </Box>
        </p>
      );
      showToast(message, "error", 2500);
      return handleToggle(item.courseID);
    } else return handleToggle(item.courseID);
  };
  return (
    <ListItem
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => {}}
          checked={checked}
          inputProps={{ "aria-labelledby": item.courseID }}
        />
      }
      disablePadding
      onClick={() => toggleCaller()}
      dir="ltr"
    >
      <Tooltip title={item.professor} arrow followCursor>
        <ListItemButton>
          <ListItemText
            id={item.courseID}
            primary={`${e2p(`${item.registeredCount}`)}/${e2p(
              `${item.capacity}`
            )}`}
            primaryTypographyProps={{
              color:
                item.registeredCount === item.capacity
                  ? "secondary"
                  : "primary",
              fontWeight: "700",
              fontSize: "0.75rem",
            }}
          />
          <ListItemText
            id={item.courseID}
            primary={`${e2p(item.courseName)} (گروه ${e2p(
              item.courseID.split("_")[1]
            )})`}
            primaryTypographyProps={{
              fontSize: "0.8rem",
              textAlign: "right",
              padding: "4px",
              color: "primary.contrastText",
              dir: "rtl",
            }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

export default CourseListItem;
