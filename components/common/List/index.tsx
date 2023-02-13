import List from "@mui/material/List";
import React, { useState } from "react";
import { TCourse } from "@/types/courses";
import Item from "@/components/common/ListItem";
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

interface IProps {
  items: TCourse[];
  selectedItems: TCourse[];
  setSelectedItems: (courseList?: TCourse[] | undefined) => void;
}

function ListContainer({ items, selectedItems, setSelectedItems }: IProps) {
  const [page, setPage] = useState(1);
  const [unit, setUnit] = useState(0);
  const [criteria, setCriteria] = useState<string>("");
  const { selectedCollege, setSelectedCollege } = useContext(
    SelectedCollegeContext
  );

  const handleToggle = (course: TCourse) => {
    if (selectedItems.findIndex((c) => c.courseID === course.courseID) !== -1)
      setSelectedItems(
        selectedItems.filter((item) => item.courseID !== course.courseID)
      );
    else setSelectedItems([...selectedItems, course]);
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
    const controller = new AbortController();
    controller.abort();
    
    const { value } = e.target;

    if (unit !== Number(value)) {
      setPage(1);
      setSelectedCollege(value);
    }
  };
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = [...e.target.value]
      .map((char) => (char === "ی" ? "ي" : char))
      .map((char) => (char === "ک" ? "ك" : char))
      .join("");
    setCriteria(value);
  };

  const unitFilteredItems = unit
    ? items.filter((item) => item.totalUnit === unit)
    : items;
  const criteriaFilteredItems = criteria
    ? unitFilteredItems.filter(
        (item) =>
          item.courseName.includes(criteria) || item.courseID.includes(criteria)
      )
    : unitFilteredItems;
  const filteredItems = criteriaFilteredItems;

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
        {filteredItems.slice((page - 1) * 20, page * 20).map((item) => (
          <Item
            key={item.courseID}
            item={item}
            checked={
              selectedItems.findIndex((c) => c.courseID === item.courseID) !==
              -1
            }
            handleToggle={() => handleToggle(item)}
          />
        ))}
      </List>
      <>
        <Options
          unitItems={UNIT_ITEMS}
          collegeItems={[...COMMON_COLLEGES, ...COLLEGE_ITEMS]}
          unit={unit}
          college={selectedCollege}
          changeHandler={changeHandler}
          changeCollegeHandler={changeCollegeHandler}
          setSelectedItems={setSelectedItems}
        />
        <Box
          sx={{
            position: "fixed",
            bottom: 1,
            left: 0,
            pl: 1,
            zIndex: 2000,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            value={criteria}
            onChange={searchHandler}
            label="جستجو"
            sx={{
              width: 342,
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
              width: 342,
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

export default ListContainer;
