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
import PaginationItem from '@mui/material/PaginationItem'
import CourseListItemLoader from "@/components/CourseListItem/Skeleton";
import { SelectedCollegeContext } from "@/context/SelectedCollegeContext";
import _ from "lodash";
import { e2p } from "@/utils/numbers";

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
          width: 350,
          bgcolor: "background.paper",
          borderRight: "1px solid var(--border-primary-color)",
          // height: "100%",
          pt: 8,
          pb: 6,
          overflow: "auto",
          outline: 0,
          direction: "ltr",
        }}
      >
        {_.times(20).map((item) => (
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
        <Box sx={{ position: "sticky", bottom: 0, width: 350 }}>
          <TextField
            variant="outlined"
            size="small"
            value={""}
            onChange={() => {}}
            label="جستجو"
            sx={{
              width: "100%",
              zIndex: 3,
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
              width: "100%",
              py: 1,
              bgcolor: "background.default",
              mx: "auto"
            }}
            dir="ltr"
            renderItem={(item) => (
              <PaginationItem {...item} page={e2p(`${item.page}`)} />
            )}
          />
        </Box>
      </>
    </>
  );
}

export default CourseListLoader;
