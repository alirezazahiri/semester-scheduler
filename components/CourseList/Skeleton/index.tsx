import List from "@mui/material/List";
import React from "react";
import Pagination from "@mui/material/Pagination";
import { SelectChangeEvent, TextField } from "@mui/material";
import Options from "@/components/common/Options";
import { useContext } from "react";
import Box from "@mui/material/Box";
import {
  COLLEGE_ITEMS,
  COMMON_COLLEGES,
  UNIT_ITEMS,
} from "@/constants/index.constants";
import CourseListItemLoader from "@/components/CourseListItem/Skeleton";
import { SelectedCollegeContext } from "@/context/SelectedCollegeContext";

function CourseListLoader() {
  const { selectedCollege, setSelectedCollege } = useContext(
    SelectedCollegeContext
  );
  const changeCollegeHandler = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setSelectedCollege(value);
  };

  return (
    <>
      <List
        sx={{
          width: 360,
          bgcolor: "background.paper",
          borderRight: "1px solid var(--border-primary-color)",
          height: "100%",
          pb: 20,
          overflow: "auto",
          position: "fixed",
          top: 70,
          outline: 0,
          left: 0,
          direction: "ltr",
        }}
      >
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((item) => (
          <CourseListItemLoader key={item} />
        ))}
      </List>
      <>
        <Options
          unitItems={UNIT_ITEMS}
          collegeItems={[...COMMON_COLLEGES, ...COLLEGE_ITEMS]}
          unit={0}
          college={selectedCollege}
          changeHandler={() => {}}
          changeCollegeHandler={changeCollegeHandler}
          setSelectedItems={() => {}}
        />
        <Box
          sx={{
            position: "fixed",
            bottom: 1,
            left: 0,
            pl: 1,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            value={""}
            onChange={() => {}}
            label="جستجو"
            sx={{
              width: 342,
              zIndex: 2000,
              textAlign: "right",
              bgcolor: "background.default",
            }}
            dir="rtl"
          />
          <Pagination
            count={10}
            color="primary"
            variant="outlined"
            onChange={() => {}}
            size="medium"
            page={5}
            sx={{
              width: 342,
              zIndex: 2000,
              pt: 1,
              bgcolor: "background.default",
            }}
            dir="ltr"
          />
        </Box>
      </>
    </>
  );
}

export default CourseListLoader;
