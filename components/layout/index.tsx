import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import Navbar from "@/components/Navbar";
import ToasterContainer from "@/components/ToasterContainer";

interface IProps {
  children: JSX.Element;
}

function Layout({ children }: IProps) {
  return (
    <>
      <ToasterContainer />
      <ThemeSwitch>
        <Navbar />
      </ThemeSwitch>
      <main dir="rtl">{children}</main>
    </>
  );
}

export default Layout;
