import List from "@mui/material/List";
import React, { useState } from "react";
import { TCourse } from "@/types/courses";
import Item from "@/components/common/ListItem";
import Pagination from "@mui/material/Pagination";
import { SelectChangeEvent } from "@mui/material";
import Options from "../Options";
import { useContext } from "react";
import { SelectedCollegeContext } from "../../../context/SelectedCollegeContext/index";

interface IProps {
  items: TCourse[];
  selectedItems: TCourse[];
  setSelectedItems: (courseList?: TCourse[] | undefined) => void;
}

const UNIT_ITEMS = [
  { name: "همه", value: 0 },
  { name: "نیم واحدی", value: 0.5 },
  { name: "یک واحدی", value: 1 },
  { name: "دو واحدی", value: 2 },
  { name: "سه واحدی", value: 3 },
  { name: "چهار واحدی", value: 4 },
];

const COMMON_COLLEGES = [
  { name: "علوم پايه", value: "11" },
  { name: "معارف", value: "16" },
  { name: "اداره تربيت بدني", value: "29" },
  { name: "پرديس بين الملل", value: "19" },
];
const COLLEGE_ITEMS = [
  { name: "مهندسي برق و كامپيوتر", value: "12" },
  { name: "مهندسي مكانيك", value: "13" },
  { name: "مهندسي عمران", value: "14" },
  { name: "مهندسي شيمي", value: "15" },
  { name: "مهندسي مواد و صنايع", value: "21" },
];

function ListContainer({ items, selectedItems, setSelectedItems }: IProps) {
  const [page, setPage] = useState(1);
  const [unit, setUnit] = useState(0);
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
    const { value } = e.target;
    if (unit !== Number(value)) {
      setPage(1);
      setSelectedCollege(value);
    }
  };

  const filteredItems = unit
    ? items.filter((item) => item.totalUnit === unit)
    : items;

  return (
    <>
      <List
        sx={{
          width: 360,
          bgcolor: "background.paper",
          borderRight: "1px solid var(--border-primary-color)",
          height: "100%",
          pb: 15,
          overflow: "auto",
          position: "fixed",
          top: 70,
          outline: 0,
          left: 0,
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
        <Pagination
          count={Math.ceil(filteredItems.length / 20)}
          color="primary"
          variant="outlined"
          onChange={paginateHandler}
          size="medium"
          page={page}
          sx={{
            width: 350,
            position: "fixed",
            bottom: 1,
            left: 0,
            zIndex: 2000,
            bgcolor: "background.default",
          }}
        />
      </>
    </>
  );
}

export default ListContainer;
