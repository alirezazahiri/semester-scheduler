import { TCourse } from "@/types/courses";
import React, { createContext, useState } from "react";

interface ContextProps {
  selectedCourses: TCourse[];
  setSelectedCourses: (courseList?: TCourse[]) => void;
}
interface IProps {
  children: JSX.Element;
}

export const SelectedCoursesContext = createContext<ContextProps>({
  selectedCourses: [],
  setSelectedCourses: () => {},
});

const initialState: TCourse[] = [
];
const SelectedCoursesContextProvider: React.FC<IProps> = ({ children }) => {
  const [selectedCourses, setSelectedCourses] =
    useState<TCourse[]>(initialState);
  const setCourses_ = (courseList: TCourse[] = []) => {
    setSelectedCourses(courseList);
  };

  return (
    <SelectedCoursesContext.Provider
      value={{ selectedCourses, setSelectedCourses: setCourses_ }}
    >
      {children}
    </SelectedCoursesContext.Provider>
  );
};

export default SelectedCoursesContextProvider;
