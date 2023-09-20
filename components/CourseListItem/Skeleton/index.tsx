import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Tooltip, Skeleton, Box } from "@mui/material";

function CourseListItemLoader() {
  return (
    <ListItem disablePadding sx={{ height: 50 }}>
      <Tooltip title={"...درحال بارگذاری"} arrow followCursor>
        <ListItemButton
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Skeleton animation="wave" variant="text" sx={{ width: 30, flexBasis: "auto" }} />
          <Box component={"div"} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Skeleton animation="wave" sx={{ width: 230, height: 12 }} />
            <Skeleton animation="wave" sx={{ width: 115, height: 12 }} />
          </Box>
          <Skeleton animation="wave" variant="rounded" sx={{ width: 20, flexBasis: "auto" }} />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

export default CourseListItemLoader;
