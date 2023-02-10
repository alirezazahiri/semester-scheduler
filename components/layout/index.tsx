import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Toaster } from "react-hot-toast";

interface IProps {
  children: JSX.Element;
}

function Layout({ children }: IProps) {
  return (
    <>
      <Toaster position="top-center"  />
      <ThemeSwitch />
      <main dir="rtl">{children}</main>
    </>
  );
}

export default Layout;
