import Link from "next/link";
import React from "react";
import { Box, Button } from "@mui/material";
import { NAV_ITEMS } from "@/constants/index.constants";
import { logoutUser } from "@/services/student.service";
import showToast from "@/utils/showToast";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from '../../context/UserContext/index';

const Navbar = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const logoutHandler = async () => {
    const result = await logoutUser();
    if (result.success) {
      router.replace("/auth/login");
      showToast("شما با موفقیت از حساب کاربری خود خارج شدید", "success", 2500);
    } else {
      router.replace("/auth/login");
      showToast("لطفاً وارد حساب کاربری خود شوید", "error", 2500);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <React.Fragment key={`${item.href}`}>
          {item.href ? (
            <Button className={`btn-${theme}`}>
              <Link
                href={item.href}
                style={{ textDecoration: "none", color: "white" }}
              >
                {item.label}
              </Link>
            </Button>
          ) : router.asPath.includes("auth") ? (
            <></>
          ) : (
            <Button onClick={logoutHandler} color="secondary">
              {item.label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Navbar;
