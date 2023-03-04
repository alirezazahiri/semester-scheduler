import { AllCoursesContext } from "@/context/AllCoursesContext";
import React, { Dispatch, SetStateAction, useContext } from "react";
import ListContainer from "@/components/common/List";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import ListContainerLoader from "@/components/common/List/Skeleton";

interface IProps {
  loading: boolean;
}
function SelectCourses({ loading }: IProps) {
  const { allCourses } = useContext(AllCoursesContext);
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );

  if (loading) return <ListContainerLoader />;

  return (
    <ListContainer
      items={allCourses}
      selectedItems={selectedCourses}
      setSelectedItems={setSelectedCourses}
    />
  );
}
export default SelectCourses;
