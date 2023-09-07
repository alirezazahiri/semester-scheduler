import { COLLEGE_ITEMS, COMMON_COLLEGES } from "@/constants/index.constants";
import { AllCoursesContext } from "@/context/AllCoursesContext";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { UserContext } from "@/context/UserContext";
import { getCourses } from "@/services/courses.service";
import { TCourse } from "@/types/courses";
import { useContext, useEffect, useState } from "react";
import removeDuplicates from "@/utils/removeDuplicates";
import { GENDER_DICTIONARY } from "@/constants/index.constants";

const useAllCourses = () => {
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );
  const { setAllCourses } = useContext(AllCoursesContext);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (selectedCourses.length || !user) return;
    if (user && selectedCourses.length) return;
    setLoading(true);

    const fetchData = async () => {
      const focusedColleges = removeDuplicates<{
        name: string;
        value: string;
      }>([
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
      ]);

      let allCourses = focusedColleges.map<Promise<TCourse[]>>(
        async ({ value }) => {
          const res = await fetch(`${process.env.NEXT_APP_DB_URI}/${value}`, {
            next: {
              revalidate: 10,
            }
          });

          const data = await res.json();

          return data;
        }
      );

      const allCollegesCourses = await Promise.all(allCourses);

      const allFocusedCourses = allCollegesCourses.flat(1);

      const allGenderRelatedCourses =
        !user?.gender || user?.gender === "0"
          ? allFocusedCourses
          : allFocusedCourses.filter(
              ({ gender }) =>
                gender ===
                  GENDER_DICTIONARY[
                    user.gender as keyof typeof GENDER_DICTIONARY
                  ] || gender === "مختلط"
            );

      setAllCourses(allGenderRelatedCourses);

      const selectedCourses = await getCourses(allGenderRelatedCourses);

      setSelectedCourses(selectedCourses);

      setLoading(false);
    };
    fetchData();
  }, [user]);

  return { loading, selectedCourses };
};

export default useAllCourses;
