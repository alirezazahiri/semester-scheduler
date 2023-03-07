import LoginForm from "@/components/LoginForm";
import { Grid } from "@mui/material";
import React from "react";
import { autoRedirector } from "@/utils/autoRedirector";
import { IRedirector, UserAuthState } from '../../utils/autoRedirector';

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

export const getServerSideProps = ({ req, res }: IRedirector) =>
  autoRedirector({ req, res, to: "/", stayCondition: UserAuthState.UNAUTHORIZED });

export default LoginPage;
