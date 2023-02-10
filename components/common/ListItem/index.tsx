import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { TCourse } from "@/types/courses";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { WeeklyPlanContext } from "@/context/WeeklyPlanContext/index";
import sortedPlan from "@/utils/sortDailyPlan";
import { isInterfering } from "../../../utils/calculateDayRow";
import showToast from "@/utils/showToast";
import { SelectedCoursesContext } from '../../../context/SelectedCoursesContext/index';
import {
  WEEK_DAYS_DICTIONARY,
  WEEK_DAYS_FA,
} from "@/constants/index.constants";

interface IProps {
  item: TCourse;
  handleToggle: (id: string) => void;
  checked: boolean;
}

function Item({ item, handleToggle, checked }: IProps) {
  const { weeklyPlan } = useContext(WeeklyPlanContext);
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const toggleCaller = () => {
    if (selectedCourses.find(c => c.courseID === item.courseID)) {
      return handleToggle(item.courseID);
    }
    const days = Object.keys(weeklyPlan);
    // console.log(days, sortedPlans, item);
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
            interferenceCourses.push(sorted[i].courseName);
            interferenceCourses.push(item.courseName);
          }
        }
      }
    }

    if (interferenceDays.length > 0) {
      const message = `تداخل درس های ${interferenceCourses.join(" و ")} در روز${
        interferenceDays.length >= 2 ? "های" : ""
      } ${interferenceDays
        .map(
          (d) =>
            WEEK_DAYS_DICTIONARY[
              d as
                | "saturday"
                | "sunday"
                | "monday"
                | "tuesday"
                | "wednesday"
                | "thursday"
                | "friday"
            ]
        )
        .join(" و ")}`;
      showToast(message, "error", 2500);
    }

    else
      return handleToggle(item.courseID);
  };
  return (
    <ListItem
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => handleToggle(item.courseID)}
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
            primary={`${item.registeredCount}/${item.capacity}`}
            primaryTypographyProps={{
              color:
                item.registeredCount === item.capacity
                  ? "secondary"
                  : "primary",
              fontWeight: "700",
            }}
          />
          <ListItemText id={item.courseID} primary={item.courseName} />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

export default Item;
