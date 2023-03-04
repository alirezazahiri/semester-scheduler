import SelectCourses from "@/components/SelectCourses";
import { Box } from "@mui/material";
import ScheduleTable from "@/components/ScheduleTable";
import { useContext, useEffect, useState } from "react";
import { AllCoursesContext } from "@/context/AllCoursesContext";
import { SelectedCollegeContext } from "@/context/SelectedCollegeContext";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import { getCourses, saveCourses } from "@/services/courses.service";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext/index";
import { COLLEGE_ITEMS, COMMON_COLLEGES } from "@/constants/index.constants";
import { TCourse } from "@/types/courses";
import { UserContext } from "@/context/UserContext/index";
import useAllCourses from "hooks/useAllCourses";

function Index({ sid }: { sid: string }) {
  // const { selectedCourses, setSelectedCourses } = useContext(
  //   SelectedCoursesContext
  // );
  // const { setAllCourses } = useContext(AllCoursesContext);
  // const [loading, setLoading] = useState(false);
  // const { user } = useContext(UserContext);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     const focusedColleges = [
  //       ...COLLEGE_ITEMS.filter((item, idx) =>
  //         idx == 0
  //           ? true
  //           : user
  //           ? user.collegeId === "00"
  //             ? true
  //             : item.value === user.collegeId
  //           : true
  //       ),
  //       ...COMMON_COLLEGES,
  //     ];

  //     let allCourses = focusedColleges.map<Promise<TCourse[]>>(
  //       async ({ value }) => {
  //         const res = await fetch(`${process.env.NEXT_APP_DB_URI}/${value}`);

  //         const data = await res.json();

  //         return data;
  //       }
  //     );

  //     const allCollegesCourses = await Promise.all(allCourses);

  //     const allFocusedCourses = allCollegesCourses.flat(1);
  //     allFocusedCourses.shift();

  //     setAllCourses(allFocusedCourses);

  //     const selectedCourses = await getCourses(allFocusedCourses);

  //     setSelectedCourses(selectedCourses);

  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);
  const { selectedCourses, loading } = useAllCourses()
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        display: "flex",
        overflowX: "scroll",
      }}
    >
      <Box sx={{ overflow: "hidden", overFlowX: "scroll" }}>
        <SelectCourses loading={loading} />
      </Box>
      <Box
        sx={{
          ml: 30,
          mt: 9,
          mr: 1,
          height: "92vh",
          overflow: "auto",
          overflowY: "hidden",
        }}
      >
        <ScheduleTable />
      </Box>
      <Fab
        color="primary"
        aria-label="save"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() =>
          saveCourses(
            selectedCourses.map((course) => course.courseID),
            sid
          )
        }
      >
        <SaveIcon sx={{ color: "#B8BBC0" }} />
      </Fab>
    </Box>
  );
}

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({
    req,
    res,
    to: "/auth/login",
    stayCondition: UserAuthState.AUTHORIZED,
  });

export default Index;
