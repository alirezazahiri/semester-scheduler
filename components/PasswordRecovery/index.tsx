import React, { useState } from "react";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import {
  FormControl,
  Typography,
  Step,
  StepLabel,
  Stepper,
  Box,
  StepContent,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneNumberStep from "./PhoneNumberStep";
import OTPCheckStep from "./OTPCheckStep";

const STEPS = [
  "وارد کردن شماره تلفن همراه",
  "بررسی کد تایید ارسال شده",
  "تغییر گذرواژه",
];

function PasswordRecovery() {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const phoneNumberSubmitHandler = (value: string) => {
    setPhoneNumber(value);
    handleNext();
  };

  const OTPSubmitHandler = (value: string) => {
    setOtp(value);
    handleNext();
  };

  return (
    <Box
      sx={{
        width: "80%",
        [theme.breakpoints.up("md")]: {
          width: "50%",
        },
        mx: "auto",
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {STEPS.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
            <StepContent>
              <Box sx={{ mb: 2, textAlign: "center" }}>
                {activeStep === 0 && (
                  <PhoneNumberStep
                    onSubmit={phoneNumberSubmitHandler}
                    currentValue={phoneNumber}
                  />
                )}
                {activeStep === 1 && (
                  <OTPCheckStep
                    length={4}
                    phoneNumber={phoneNumber}
                    onSubmit={OTPSubmitHandler}
                    currentValue={otp}
                  />
                )}
              </Box>
              {activeStep !== 0 && (
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  مرحله قبل
                </Button>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

// <>

//   <PhoneNumberStep onSubmit={phoneNumberSubmitHandler} />
// </>
export default PasswordRecovery;
