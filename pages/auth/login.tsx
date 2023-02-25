import LoginForm from "@/components/LoginForm";
import { Grid } from "@mui/material";
import React from "react";

const LoginPage = () => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100vh",
      }}
    >
      <LoginForm />
    </Grid>
  );
};

export default LoginPage;
