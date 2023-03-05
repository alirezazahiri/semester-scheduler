import SelectCourses from "@/components/SelectCourses";
import { Box } from "@mui/material";
import ScheduleTable from "@/components/ScheduleTable";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import useAllCourses from "hooks/useAllCourses";
import { saveCourses } from "@/services/courses.service";

function Index({ sid }: { sid: string }) {
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
