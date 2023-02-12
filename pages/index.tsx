import SelectCourses from "@/components/SelectCourses";
import { Box } from "@mui/material";
import ScheduleTable from "@/components/ScheduleTable";
import { useContext, useEffect } from "react";
import { AllCoursesContext } from "@/context/AllCoursesContext/index";
import { SelectedCollegeContext } from "@/context/SelectedCollegeContext/index";

function Index() {
  const { selectedCollege } = useContext(SelectedCollegeContext);
  const { allCourses, setAllCourses } = useContext(AllCoursesContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_APP_DB_URI}/${selectedCollege}`);
      const courses = await res.json();
      setAllCourses(courses);
    };
    fetchData();
  }, [selectedCollege]);

  return (
    <Box sx={{ bgcolor: "background.default", display: "flex" }}>
      <Box sx={{ width: "fit-content" }}>
        <SelectCourses courses={allCourses} />
      </Box>
      <Box sx={{ ml: 46, mt: 9, mr: 1, height: "92vh", overflow: "hidden", overFlowX: "scroll" }}>
        <ScheduleTable />
      </Box>
    </Box>
  );
}

export default Index;
