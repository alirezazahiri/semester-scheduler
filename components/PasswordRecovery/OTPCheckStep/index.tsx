import React, { FC, useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Typography, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { matchIsNumeric } from "@/utils/otp.utils";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import CountdownTimer from "@/components/common/CountdownTimer";

interface IProps {
  length: number;
  phoneNumber: string;
  onSubmit: (otp: string) => void;
  currentValue: string;
  timerSeconds: number;
  onTimerFinished?: Function;
}

const OTPCheckStep: FC<IProps> = ({
  length,
  phoneNumber,
  onSubmit,
  currentValue = "",
  onTimerFinished,
  timerSeconds,
}) => {
  const theme = useTheme();
  const [otp, setOtp] = useState(currentValue);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const validate = (char: string, index: number) => {
    return matchIsNumeric(char);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // check otp code with api
    onSubmit(otp);
    setLoading(false);
  };

  return (
    <FormControl
      sx={{
        width: "80%",
        [theme.breakpoints.up("md")]: {
          width: "50%",
        },
        mx: "auto",
        textAlign: "center",
      }}
      component={"form"}
      onSubmit={submitHandler}
    >
      <Typography
        variant="body2"
        component="h4"
        color="primary"
        fontWeight={500}
        py={4}
        textAlign={"center"}
      >
        لطفا کد تایید ارسال شده برای شماره تلفن{" "}
        <Typography
          component="span"
          variant="body2"
          color="primary.contrastText"
          fontWeight={500}
          py={4}
          dir="ltr"
        >
          {phoneNumber}
        </Typography>{" "}
        را وارد نمایید
      </Typography>
      <MuiOtpInput
        dir="ltr"
        value={otp}
        onChange={handleChange}
        length={length}
        TextFieldsProps={{
          size: "medium",
          inputProps: {
            inputMode: "numeric",
          },
        }}
        validateChar={validate}
      />
      <CountdownTimer
        seconds={timerSeconds}
        py={1}
        onFinished={() => {
          if (onTimerFinished) onTimerFinished();
        }}
      />
      <LoadingButtonElement
        label="تایید"
        loading={loading}
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        disabled={otp.length !== length}
        sx={{
          width: "100%",
          mt: 0,
          mx: "auto",
          color: "background.default",
          fontSize: 16,
        }}
      />
    </FormControl>
  );
};

export default OTPCheckStep;
