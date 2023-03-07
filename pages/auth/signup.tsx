import SignupForm from "@/components/SignupForm";
import { Grid } from "@mui/material";
import React from "react";

const SignUpPage = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100vh"
      }}
    >
      <SignupForm />
    </Grid>
  );
};

export default SignUpPage;
