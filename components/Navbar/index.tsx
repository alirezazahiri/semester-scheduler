import Link from "next/link";
import React, { useState } from "react";
import { Box, Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { NAV_ITEMS } from "@/constants/index.constants";
import { logoutUser } from "@/services/student.service";
import showToast from "@/utils/showToast";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Navbar = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log(router.asPath);

  const logoutHandler = async () => {
    setLoading(true);
    showToast("در حال خروج از حساب کاربری", "loading", 10000, true);
    const result = await logoutUser();
    if (result.success) {
      setUser({
        collegeId: "",
        name: "",
        sid: "",
      });
      router.replace("/auth/login");
      showToast(
        "شما با موفقیت از حساب کاربری خود خارج شدید",
        "success",
        2500,
        true
      );
    } else {
      router.replace("/auth/login");
      showToast("لطفاً وارد حساب کاربری خود شوید", "error", 2500, true);
    }
    setLoading(false);
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
      }}
    >
      {user?.name !== "" ? (
        <>
          <Button
            onClick={user?.name ? clickHandler : () => {}}
            disabled={!user?.name || user?.name === ""}
            sx={{ fontSize: "13px" }}
          >
            {user?.name}
            {!open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </Button>
          <Menu
            id="navbar-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeHandler}
            dir="rtl"
            MenuListProps={{ sx: { bgcolor: "background.paper" } }}
          >
            {NAV_ITEMS.map((item) => (
              <Box key={`${item.href}`}>
                {item.href ? (
                  <MenuItem
                    key={`${item.href}`}
                    className={`nav-btn-${theme} ${
                      item.href === router.asPath ? "active-nav-" + theme : ""
                    }`}
                    onClick={() => {
                      router.push(item.href);
                      closeHandler();
                    }}
                    sx={{ textAlign: "center" }}
                  >
                    <Link
                      href={item.href}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {item.label}
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={`${item.href}`}
                    className="nav-btn-exit"
                    onClick={() => {
                      logoutHandler();
                      closeHandler();
                    }}
                    disabled={loading}
                    sx={{ textAlign: "center", color: "secondary.main" }}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" size={18} />
                    ) : (
                      item.label
                    )}
                  </MenuItem>
                )}
              </Box>
            ))}
          </Menu>
        </>
      ) : router.asPath.startsWith("/auth") ? (
        <></>
      ) : (
        <Button
          onClick={() => {
            router.push("/auth/login");
          }}
          sx={{ fontSize: "13px" }}
        >
          ورود
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
