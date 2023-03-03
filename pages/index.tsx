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

function Index({ sid }: { sid: string }) {
  const { selectedCollege } = useContext(SelectedCollegeContext);
  const { selectedCourses, setSelectedCourses } = useContext(
    SelectedCoursesContext
  );
  const { setAllCourses } = useContext(AllCoursesContext);
  const [controller, setController] = useState(new AbortController());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_APP_DB_URI}/${selectedCollege}`,
        {
          signal: controller.signal,
        }
      );
      const courses = await res.json();
      setAllCourses(courses);
      const selectedCourses = await getCourses(courses);
      setSelectedCourses(selectedCourses);
      setLoading(false);
    };
    fetchData();
  }, [selectedCollege]);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        display: "flex",
        overflowX: "scroll",
      }}
    >
      <Box sx={{ overflow: "hidden", overFlowX: "scroll" }}>
        <SelectCourses
          loading={loading}
          controller={controller}
          setController={setController}
        />
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
