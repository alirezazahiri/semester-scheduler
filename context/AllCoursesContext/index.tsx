import React, { createContext, useState } from "react";
import { TCourse } from "@/types/courses";

interface ContextProps {
  allCourses: TCourse[];
  setAllCourses: (courseList?: TCourse[]) => void;
}
interface IProps {
  children: JSX.Element;
}

export const AllCoursesContext = createContext<ContextProps>({
  allCourses: [],
  setAllCourses: () => {},
});

const AllCoursesContextProvider: React.FC<IProps> = ({ children }) => {
  const [allCourses, setAllCourses] = useState<TCourse[]>([]);

  const setAllCourses_ = (courseList: TCourse[] = []) => {
    setAllCourses(courseList);
  };

  return (
    <AllCoursesContext.Provider value={{ allCourses, setAllCourses: setAllCourses_ }}>
      {children}
    </AllCoursesContext.Provider>
  );
};

export default AllCoursesContextProvider;
