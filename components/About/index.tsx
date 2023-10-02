import { VERSION_NUMBER } from "@/constants/index.constants";
import { Box, Typography } from "@mui/material";
import React from "react";

function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2.5,
      }}
    >
      <Typography component="h1" variant="h3" fontWeight={500} color="primary.main">
        دربارۀ برنامه
      </Typography>
      <Typography
        component="p"
        variant="body1"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        نسخۀ فعلی:
        <Typography
          component="span"
          variant="caption"
          sx={{
            bgcolor: "primary.light",
            px: 1,
            py: 0.1,
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "background.default"
          }}
        >
          {VERSION_NUMBER}
        </Typography>
      </Typography>
    </Box>
  );
}

export default About;
