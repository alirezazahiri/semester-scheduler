import React, { FC } from "react";
import Fab from "@mui/material/Fab";

import HelpIcon from "@mui/icons-material/Help";
import { Tooltip } from "@mui/material";
import Link from "next/link";

const HelpFab: FC = () => {
  return (
    <Tooltip title="راهنما" arrow>
      <Fab color="info" aria-label="help" href="/how-to-use" LinkComponent={Link}>
        <HelpIcon sx={{ color: "#fff" }} />
      </Fab>
    </Tooltip>
  );
};

export default HelpFab;
