import { COLLEGE_ITEMS, COMMON_COLLEGES } from "@/constants/index.constants";
import { AllCoursesContext } from "@/context/AllCoursesContext";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { UserContext } from "@/context/UserContext";
import { getCourses } from "@/services/courses.service";
import { TCourse } from "@/types/courses";
import { useContext, useEffect, useState } from "react";

const useAllCourses = () => {
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );
  const { setAllCourses } = useContext(AllCoursesContext);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (selectedCourses.length) return;
    
    setLoading(true);
    const fetchData = async () => {
      const focusedColleges = [
        ...COLLEGE_ITEMS.filter((item, idx) =>
          idx == 0
            ? false
            : user
            ? user.collegeId === "00"
              ? true
              : item.value === user.collegeId
            : true
        ),
        ...COMMON_COLLEGES,
      ];

      let allCourses = focusedColleges.map<Promise<TCourse[]>>(
        async ({ value }) => {
          const res = await fetch(`${process.env.NEXT_APP_DB_URI}/${value}`);

          const data = await res.json();

          return data;
        }
      );

      const allCollegesCourses = await Promise.all(allCourses);

      const allFocusedCourses = allCollegesCourses.flat(1);
      allFocusedCourses.shift();

      setAllCourses(allFocusedCourses);

      const selectedCourses = await getCourses(allFocusedCourses);

      setSelectedCourses(selectedCourses);

      setLoading(false);
    };
    fetchData();
  }, []);

  return { loading, selectedCourses };
};

export default useAllCourses;
