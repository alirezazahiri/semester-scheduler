import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Tooltip, Skeleton } from "@mui/material";

function ItemLoader() {
  return (
    <ListItem disablePadding sx={{height: 50}}>
      <Tooltip title={"loading..."} arrow followCursor>
        <ListItemButton sx={{height: "100%"}}>
          <Skeleton animation="wave" sx={{ width: 20 }}/>
          <Skeleton animation="wave" sx={{ width: 310, mx: "5px" }}/>
          <Skeleton animation="wave" sx={{ width: 20 }}/>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

export default ItemLoader;
