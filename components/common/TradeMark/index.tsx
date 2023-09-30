import React from "react";
import { Typography } from "@mui/material";

interface Props {
  mdx?: boolean;
}

const TradeMark = ({ mdx }: Props) => (
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
      opacity: 0.6,
      display: mdx ? "none" : "",
    }}
  >
    &copy; تمامی حقوق وبسایت محفوظ می باشد
  </Typography>
);

export default TradeMark;
