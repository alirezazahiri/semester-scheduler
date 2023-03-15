import { AllCoursesContext } from "@/context/AllCoursesContext";
import React, { Dispatch, SetStateAction, useContext } from "react";
import CourseList from "@/components/CourseList";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import CourseListLoader from "@/components/CourseList/Skeleton";

interface IProps {
  loading: boolean;
}
function SelectCourses({ loading }: IProps) {
  const { allCourses } = useContext(AllCoursesContext);
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );

  if (loading) return <CourseListLoader />;

  return (
    <CourseList
      items={allCourses}
      selectedItems={selectedCourses}
      setSelectedItems={setSelectedCourses}
    />
  );
}
export default SelectCourses;
