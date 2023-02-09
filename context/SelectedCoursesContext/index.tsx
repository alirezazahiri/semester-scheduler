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
  {
    college: "مهندسي برق و كامپيوتر",
    group: "كامپيوتر",
    courseID: "1221057_02",
    courseName: "آزمايشگاه مدارهاي منطقي و معماري كامپيوتر",
    totalUnit: 1,
    practicalUnit: 1,
    capacity: 12,
    registeredCount: 12,
    waitListCount: 0,
    gender: "مختلط",
    professor: "يزدانيان اميري زهرا",
    dateAndTime: { monday: { from: "17:30", to: "19:30" } },
    description: "",
  },
  {
    college: "مهندسي برق و كامپيوتر",
    group: "كامپيوتر",
    courseID: "1221108_01",
    courseName: "كارگاه برنامه نويسي متلب",
    totalUnit: 1,
    practicalUnit: 1,
    capacity: 12,
    registeredCount: 12,
    waitListCount: 0,
    gender: "مختلط",
    professor: "ابراهيمي خاله سري فريده",
    dateAndTime: { sunday: { from: "08:00", to: "10:00" } },
    description: "",
  },
  {
    college: "مهندسي برق و كامپيوتر",
    group: "كامپيوتر",
    courseID: "1221117_01",
    courseName: "مباني داده كاوي",
    totalUnit: 3,
    practicalUnit: 0,
    capacity: 40,
    registeredCount: 39,
    waitListCount: 0,
    gender: "مختلط",
    professor: "عمرانپور بندپي حسام",
    dateAndTime: {
      saturday: { from: "08:00", to: "09:30" },
      monday: { from: "08:00", to: "09:30" },
      exam: { date: "1402-04-04", time: "08:30-10:30" },
    },
    description: "",
  },
  {
    college: "مهندسي برق و كامپيوتر",
    group: "كامپيوتر",
    courseID: "1221136_01",
    courseName: "مباني بازيابي اطلاعات",
    totalUnit: 3,
    practicalUnit: 0,
    capacity: 40,
    registeredCount: 34,
    waitListCount: 0,
    gender: "مختلط",
    professor: "منصوري مجتبي",
    dateAndTime: {
      saturday: { from: "15:30", to: "17:00" },
      monday: { from: "15:30", to: "17:00" },
      exam: { date: "1402-03-28", time: "14:00-16:00" },
    },
    description: "",
  },
  {
    college: "مهندسي برق و كامپيوتر",
    group: "كامپيوتر",
    courseID: "1221017_01",
    courseName: "انتقال داده ها",
    totalUnit: 3,
    practicalUnit: 0,
    capacity: 40,
    registeredCount: 29,
    waitListCount: 0,
    gender: "مختلط",
    professor: "كاظمي تبار اميركلايي سيد جواد",
    dateAndTime: {
      sunday: { from: "10:00", to: "11:30" },
      tuesday: { from: "10:00", to: "11:30" },
      exam: { date: "1402-03-31", time: "08:30-10:30" },
    },
    description: "",
  },
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
