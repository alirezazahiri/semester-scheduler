import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeContext } from "@/context/ThemeContext";

function ToasterContainer() {
  const { theme } = useContext(ThemeContext);
  return (
    <Toaster
      containerStyle={{
        textAlign: "right",
      }}
      toastOptions={{
        style: {
          backgroundColor: theme === "dark" ? "#07121D" : "#D4D9E1",
          color: theme === "dark" ? "#B8BBC0" : "#0B0B0B",
          border: "1px solid " + theme === "dark" ? "#002884" : "#3f50b5",
        },
      }}
    />
  );
}

export default ToasterContainer;
