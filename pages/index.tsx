import { TCourse } from "@/types/courses";
import SelectCourses from "@/components/SelectCourses";
import { Grid, Box } from "@mui/material";
import ScheduleTable from "@/components/ScheduleTable";

interface IProps {
  courses: TCourse[];
}
function Index({ courses }: IProps) {
  return (
    <Box
      sx={{ bgcolor: "background.default", display: "flex" }}
    >
      <Box sx={{ width: "fit-content" }}>
        <SelectCourses courses={courses} />
      </Box>
      <Box sx={{ ml: 16.5, mt: 9, height: "100vh" }}>
        <ScheduleTable />
      </Box>
    </Box>
  );
}

export default Index;

export async function getStaticProps() {
  const res = await fetch("http://localhost:8080/courses");
  const courses = await res.json();
  return {
    props: {
      courses,
    },
  };
}
