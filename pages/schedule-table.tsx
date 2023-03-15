import ScheduleTable from "@/components/ScheduleTable";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import { Box } from "@mui/material";
import React from "react";
import Fab from "@mui/material/Fab";
import PrintIcon from "@mui/icons-material/Print";
import SaveFab from "@/components/SaveFab";

function ScheduleTablePage({ sid }: { sid: string }) {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "background.default",
          px: 4,
          pt: 8,
        }}
      >
        <ScheduleTable fullWidth />
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
        <SaveFab
          sid={sid}
          nextFab={
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
          }
        />
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
