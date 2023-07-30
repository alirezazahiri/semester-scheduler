import React from "react";
import { Typography } from "@mui/material";

const TradeMark = () => (
  <Typography
    component="p"
    variant="h6"
    color="primary"
    dir="ltr"
    sx={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 5,
      textAlign: "center",
      fontSize: 14,
    }}
  >
    &copy; تمامی حقوق سایت محفوظ می باشد
  </Typography>
);

export default TradeMark;
