import ScheduleTable from "@/components/ScheduleTable";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import { Box } from "@mui/material";
import React from "react";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import { saveCourses } from "@/services/courses.service";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext/index";
import useAllCourses from "hooks/useAllCourses";

function ScheduleTablePage({ sid }: { sid: string }) {
  const { selectedCourses } = useAllCourses()
  return (
    <>
      <Box
        sx={{
          height: "93vh",
          bgcolor: "background.default",
          textAlign: "center",
          px: 4,
        }}
      >
        <ScheduleTable mt={8} fullWidth />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "fit-content",
          position: "fixed",
          bottom: 16,
          right: 16,
          displayPrint: "none",
        }}
      >
        <Fab
          color="primary"
          aria-label="save"
          onClick={() =>
            saveCourses(
              selectedCourses.map((course) => course.courseID),
              sid
            )
          }
        >
          <SaveIcon sx={{ color: "#B8BBC0" }} />
        </Fab>
        <Fab
          color="secondary"
          aria-label="print"
          onClick={() => {
            window.print();
          }}
          sx={{ mr: 1 }}
        >
          <PrintIcon />
        </Fab>
      </Box>
    </>
  );
}

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({
    req,
    res,
    to: "/auth/login",
    stayCondition: UserAuthState.AUTHORIZED,
  });

export default ScheduleTablePage;
