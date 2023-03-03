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

function Index() {
  const { selectedCollege } = useContext(SelectedCollegeContext);
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
