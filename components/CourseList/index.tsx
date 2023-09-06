import List from "@mui/material/List";
import React, { useState } from "react";
import { TCourse } from "@/types/courses";
import CourseListItem from "@/components/CourseListItem";
import Pagination from "@mui/material/Pagination";
import { SelectChangeEvent, TextField } from "@mui/material";
import Options from "@/components/common/Options";
import { useContext } from "react";
import { SelectedCollegeContext } from "@/context/SelectedCollegeContext";
import Box from "@mui/material/Box";
import {
  COLLEGE_ITEMS,
  COMMON_COLLEGES,
  UNIT_ITEMS,
} from "@/constants/index.constants";
import { UserContext } from "@/context/UserContext";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";

interface IProps {
  items: TCourse[];
}

function CourseList({ items }: IProps) {
  const [page, setPage] = useState(1);
  const [unit, setUnit] = useState(0);
  const [criteria, setCriteria] = useState<string>("");
  const { selectedCollege, setSelectedCollege } = useContext(
    SelectedCollegeContext
  );
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );
  const { user } = useContext(UserContext);

  const handleToggle = (course: TCourse) => {
    if (selectedCourses.findIndex((c) => c.courseID === course.courseID) !== -1)
      setSelectedCourses(
        selectedCourses.filter((item) => item.courseID !== course.courseID)
      );
    else setSelectedCourses([...selectedCourses, course]);
  };

  const paginateHandler = (_: any, p: number) => {
    setPage(p);
  };

  const changeHandler = (e: SelectChangeEvent) => {
    const { value } = e.target;
    if (unit !== Number(value)) {
      setPage(1);
      setUnit(Number(value));
    }
  };
  const changeCollegeHandler = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setPage(1);
    setSelectedCollege(value);
  };
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = [...e.target.value]
      .map((char) => (char === "ی" ? "ي" : char))
      .map((char) => (char === "ک" ? "ك" : char))
      .join("");
    setCriteria(value);
    if (page !== 1) setPage(1);
  };

  const collegeFilteredItems =
    selectedCollege === "00"
      ? items
      : items.filter(
          (item) => [...item.courseID].slice(0, 2).join("") === selectedCollege
        );
  const unitFilteredItems = unit
    ? collegeFilteredItems.filter((item) => item.totalUnit === unit)
    : collegeFilteredItems;
  const criteriaFilteredItems = criteria
    ? unitFilteredItems.filter(
        (item) =>
          item.courseName.toLowerCase().includes(criteria.toLowerCase()) ||
          item.courseID.includes(criteria) ||
          item.professor.includes(criteria)
      )
    : unitFilteredItems;
  const filteredItems = criteriaFilteredItems;

  return (
    <>
      <Options
        unitItems={UNIT_ITEMS}
        collegeItems={[
          ...COLLEGE_ITEMS.filter((item, idx) =>
            idx == 0
              ? true
              : user
              ? user.collegeId === "00"
                ? true
                : item.value === user.collegeId
              : true
          ),
          ...COMMON_COLLEGES,
        ]}
        unit={unit}
        college={selectedCollege}
        changeHandler={changeHandler}
        changeCollegeHandler={changeCollegeHandler}
        setSelectedItems={setSelectedCourses}
      />
      <List
        sx={{
          width: 350,
          bgcolor: "background.paper",
          borderRight: "1px solid var(--border-primary-color)",
          pt: 8,
          pb: 12,
          overflow: "auto",
          outline: 0,
          direction: "ltr",
        }}
      >
        {filteredItems.slice((page - 1) * 20, page * 20).map((item) => (
          <CourseListItem
            key={item.courseID}
            item={item}
            checked={
              selectedCourses.findIndex((c) => c.courseID === item.courseID) !==
              -1
            }
            handleToggle={() => handleToggle(item)}
          />
        ))}
      </List>
      <Box sx={{ position: "fixed", bottom: 0, width: 350 }}>
        <TextField
          variant="outlined"
          size="small"
          value={criteria}
          onChange={searchHandler}
          label="جستجو"
          sx={{
            width: "100%",
            textAlign: "right",
            bgcolor: "background.default",
          }}
          dir="rtl"
        />
        <Pagination
          count={Math.ceil(filteredItems.length / 20)}
          color="primary"
          variant="outlined"
          onChange={paginateHandler}
          size="medium"
          page={page}
          sx={{
            width: "100%",
            py: 1,
            bgcolor: "background.default",
          }}
          dir="ltr"
        />
      </Box>
    </>
  );
}

export default CourseList;
