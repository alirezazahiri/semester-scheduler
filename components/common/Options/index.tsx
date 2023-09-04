import {
  Box,
  Grid,
  IconButton,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SelectContainer from "@/components/common/Select";
import removeDuplicates from "@/utils/removeDuplicates";

interface IProps {
  unitItems: {
    name: string;
    value: string | number;
  }[];
  collegeItems: {
    name: string;
    value: string;
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
        position: "fixed",
        top: 0,
        zIndex: 1,
        width: 350,
        borderBottom: "1px solid var(--border-primary-color)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          bgcolor: "background.default",
          pl: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pr: 1,
          }}
        >
          <Typography component="p" variant="caption" color="inherit">
            بازنشانی
          </Typography>
          <IconButton color="inherit" onClick={() => setSelectedItems([])}>
            <RestartAltIcon />
          </IconButton>
        </Box>
        <Grid sx={{ display: "flex" }} spacing={1} container>
          <Grid xs={5} item>
            <SelectContainer
              width="100%"
              items={unitItems}
              name={"واحد"}
              value={unit}
              handleChange={changeHandler}
            />
          </Grid>
          <Grid xs={6} item>
            <SelectContainer
              width="100%"
              items={removeDuplicates<{
                name: string;
                value: string;
              }>(collegeItems)}
              name={"دانشکده"}
              value={college}
              handleChange={changeCollegeHandler}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Options;
