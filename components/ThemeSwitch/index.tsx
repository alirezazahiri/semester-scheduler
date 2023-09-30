import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import SwipeableCourseList from "@/components/SwipeableCourseList/index";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext/index";

function ThemeSwitch({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();
  const { user } = useContext(UserContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.default",
        p: 2,
        borderBottom: "1px solid var(--border-primary-color)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        displayPrint: "none",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {children}
        <IconButton onClick={toggleTheme}>
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      {user && router.asPath === "/" && <SwipeableCourseList />}
    </Box>
  );
}

export default ThemeSwitch;
