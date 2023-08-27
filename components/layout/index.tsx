import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

interface IProps {
  children: JSX.Element;
}

function Layout({ children }: IProps) {
  return (
    <>
      <Toaster position="top-center" />
      <ThemeSwitch>
        <Navbar />
      </ThemeSwitch>

      <main dir="rtl">{children}</main>
    </>
  );
}

export default Layout;
