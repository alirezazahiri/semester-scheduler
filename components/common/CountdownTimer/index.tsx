import { convertToTimeString } from "@/utils/timer.utils";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface IProps {
  seconds: number;
  py?: number | string;
  onFinished?: Function;
}

function CountdownTimer({ seconds, py, onFinished }: IProps) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count == 0 && onFinished) onFinished();
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer as NodeJS.Timer);
  }, [count]);

  return (
    <Typography
      component="span"
      variant="body2"
      color="primary.contrastText"
      fontWeight={500}
      py={py ?? 0}
      dir="ltr"
      textAlign={"left"}
    >
      {convertToTimeString(count)}
    </Typography>
  );
}

export default CountdownTimer;
