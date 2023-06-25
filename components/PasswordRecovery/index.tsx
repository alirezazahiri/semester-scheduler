import React, { useState } from "react";
import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import {
  FormControl,
  Typography,
  Step,
  StepLabel,
  Stepper,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const STEPS = ["وارد کردن شماره تلفن همراه", "بررسی کد تایید ارسال شده", "تغییر گذرواژه"]

function PasswordRecovery() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };

  const submitHandler = () => {};

  return (
    <>
      <FormControl
        sx={{
          width: "80%",
          [theme.breakpoints.up("md")]: {
            width: "50%",
          },
          mx: "auto",
        }}
        component={"form"}
        onSubmit={submitHandler}
      >
        <Box sx={{ py: 8 }}>
          <Stepper activeStep={2} alternativeLabel>
            {STEPS.map(
              (label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            )}
          </Stepper>
        </Box>
        <Typography
          variant="h4"
          component="h4"
          color="primary"
          fontWeight={500}
        >
          بازیابی گذرواژه
        </Typography>
        <Typography
          variant="body2"
          component="h4"
          color="primary"
          fontWeight={500}
          py={4}
          textAlign={"center"}
        >
          لطفا شماره تلفن همراه خود را برای دریافت کد تایید وارد کنید
        </Typography>
        <PhoneNumberInput value={phoneNumber} onChange={changeHandler} />
        <LoadingButtonElement
          label="ثبت"
          loading={loading}
          type="submit"
          color="primary"
          variant="contained"
          size="large"
        />
      </FormControl>
    </>
  );
}

export default PasswordRecovery;
