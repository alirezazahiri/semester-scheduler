import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import Navbar from "@/components/Navbar";
import ToasterContainer from "@/components/ToasterContainer";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { MDXProvider } from "@mdx-js/react";

interface IProps {
  children: JSX.Element;
}

function Layout({ children }: IProps) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <MDXProvider>
      <ToasterContainer />
      <ThemeSwitch>
        <Navbar />
      </ThemeSwitch>
      <Box
        component="main"
        dir="rtl"
        sx={{
          [theme.breakpoints.down("md")]: {
            overflowX: router.asPath === "/" ? "scroll" : "visible",
            minHeight: "100vh",
          },
        }}
      >
        {children}
      </Box>
    </MDXProvider>
  );
}

export default Layout;
