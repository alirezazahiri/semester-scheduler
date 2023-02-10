import { AllCoursesContext } from "@/context/AllCoursesContext";
import { TCourse } from "@/types/courses";
import { useContext, useEffect } from "react";
import ListContainer from "@/components/common/List";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext/index";

interface IProps {
  courses: TCourse[];
}
function SelectCourses({ courses }: IProps) {
  const { allCourses, setAllCourses } = useContext(AllCoursesContext);
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );
  useEffect(() => {
    setAllCourses(courses);
  }, []);

  if (!allCourses.length) return <h1>loading...</h1>;

  return (
    <>
      <ListContainer
        items={allCourses}
        selectedItems={selectedCourses}
        setSelectedItems={setSelectedCourses}
      />
    </>
  );
}
export default SelectCourses;
