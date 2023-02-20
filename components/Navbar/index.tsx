import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <Link href="/">صفحه اصلی</Link>
      <Link href="/schedule-table">مشاهده برنامه هفتگی</Link>
    </div>
  );
};

export default Navbar;
