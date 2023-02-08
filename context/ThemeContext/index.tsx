import React, { useState } from "react";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";

interface IProps {
  children: JSX.Element;
}

const SETTINGS: Partial<ThemeOptions> = {
  direction: "ltr",
  typography: {
    fontSize: 12,
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#B8BBC0",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#0b0b0b",
    },
  },
};

const LIGHT_THEME = createTheme({
  ...SETTINGS,
  palette: {
    ...SETTINGS.palette,
    mode: "light",
    background: {
      default: "#d4d9e1",
      paper: "#d4d9e1",
    },
  },
});
const DARK_THEME = createTheme({
  ...SETTINGS,
  palette: {
    ...SETTINGS.palette,
    mode: "dark",
    background: {
      default: "#0A1929",
      paper: "#0A1929",
    },
  },
});

export const ThemeContext = React.createContext({
  theme: "dark",
  toggleTheme: () => {},
});

const ThemeContextProvider: React.FC<IProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? LIGHT_THEME : DARK_THEME}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
