import { Box, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SelectContainer from "../Select";

interface IProps {
  unitItems: {
    name: string;
    value: string | number;
  }[];
  collegeItems: {
    name: string;
    value: string | number;
  }[];
  unit: string | number;
  college: string | number;
  changeHandler: (e: SelectChangeEvent) => void;
  changeCollegeHandler: (e: SelectChangeEvent) => void;
  setSelectedItems: (list: any[]) => void;
}

function Options({
  collegeItems,
  unitItems,
  unit,
  college,
  changeHandler,
  changeCollegeHandler,
  setSelectedItems,
}: IProps) {
  return (
    <Box
      sx={{
        width: "fit-content",
        display: "flex",
        px: 1,
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          pr: 1,
        }}
      >
        <IconButton color="inherit" onClick={() => setSelectedItems([])}>
          <RestartAltIcon />
        </IconButton>
        <Typography component="p" variant="caption" color="inherit">
          بازنشانی
        </Typography>
      </Box>
      <SelectContainer
        items={unitItems}
        name={"واحد"}
        value={unit}
        handleChange={changeHandler}
      />
      <SelectContainer
        items={collegeItems}
        name={"دانشکده"}
        value={college}
        handleChange={changeCollegeHandler}
      />
    </Box>
  );
}

export default Options;
