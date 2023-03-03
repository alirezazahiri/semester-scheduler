import ScheduleTable from "@/components/ScheduleTable";
import {
  IRedirector,
  UserAuthState,
  autoRedirector,
} from "@/utils/autoRedirector";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

function ScheduleTablePage() {
  return (
    <>
      <Box
        sx={{
          height: "93vh",
          bgcolor: "background.default",
          textAlign: "center",
          px: 4
        }}
      >
        <ScheduleTable mt={8} fullWidth />
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          window.print();
        }}
        sx={{
          width: "100%",
          borderRadius: 0,
          displayPrint: "none",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(15px)",
        }}
      >
        <Typography component="h1" variant="button" fontSize="18px">
          چاپ کن
        </Typography>
      </Button>
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
