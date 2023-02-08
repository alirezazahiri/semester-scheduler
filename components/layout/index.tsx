import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Box } from "@mui/material";

interface IProps {
  children: JSX.Element;
}

function Layout({ children }: IProps) {
  return (
    <>
      <ThemeSwitch />
      <Box>{children}</Box>
    </>
  );
}

export default Layout;
