import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Navbar from '@/components/Navbar/index';

function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        bgcolor: "background.default",
        p: 2,
        borderBottom: "1px solid var(--border-primary-color)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        displayPrint: "none"
      }}
    >
      <Navbar />
      <IconButton onClick={toggleTheme}>
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default ThemeSwitch;
