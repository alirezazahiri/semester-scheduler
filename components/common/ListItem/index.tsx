import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { TCourse } from "@/types/courses";

interface IProps {
  item: TCourse;
  handleToggle: (id: string) => void;
  checked: boolean;
}

function Item({ item, handleToggle, checked }: IProps) {
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
      onClick={() => handleToggle(item.courseID)}
    >
      <ListItemButton>
        <ListItemText
          id={item.courseID}
          primary={`${item.registeredCount}/${item.capacity}`}
          primaryTypographyProps={{
            color: item.registeredCount === item.capacity ? "secondary" : "primary",
            fontWeight: "700"
          }}
        />
        <ListItemText id={item.courseID} primary={item.courseName} />
      </ListItemButton>
    </ListItem>
  );
}

export default Item;
