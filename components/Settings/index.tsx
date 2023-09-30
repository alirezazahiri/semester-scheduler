import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import React from "react";

const SETTINGS_BUTTONS = [
  { href: "/auth/change-password", label: "تغییر گذرواژه" },
  { href: "/auth/update-profile", label: "به روز رسانی پروفایل" },
] as const;
function Settings() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2.5,
        width: "250px",
      }}
    >
      {SETTINGS_BUTTONS.map(({ href, label }) => (
        <Link
          href={href}
          key={href}
          style={{
            width: "100%",
            textDecoration: "none"
          }}
        >
          <Button
            component="button"
            sx={{
              fontSize: 20,
              width: "100%",
            }}
          >
            {label}
          </Button>
        </Link>
      ))}
    </Box>
  );
}

export default Settings;
