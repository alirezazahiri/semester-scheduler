import React, { FC } from "react";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import showToast from "@/utils/showToast";
import { saveCourses } from "@/services/courses.service";
import SaveIcon from "@mui/icons-material/Save";
import useAllCourses from "hooks/useAllCourses";
import { Box } from "@mui/material";

interface IProps {
  sid: string;
  nextFab?: JSX.Element;
}

const SaveFab: FC<IProps> = ({ sid, nextFab }) => {
  const [isSaving, setIsSaving] = useState(false);
  const { selectedCourses } = useAllCourses();

  const saveCoursesHandler = async () => {
    setIsSaving(true);
    showToast("درحال ثبت دروس انتخاب شده", "loading", 10000, true);
    await saveCourses(
      selectedCourses.map((course) => course.courseID),
      sid
    );
    setIsSaving(false);
  };

  return (
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
        onClick={saveCoursesHandler}
        disabled={isSaving}
      >
        <SaveIcon sx={{ color: "#B8BBC0" }} />
      </Fab>
      <React.Fragment>{nextFab}</React.Fragment>
    </Box>
  );
};

export default SaveFab;
