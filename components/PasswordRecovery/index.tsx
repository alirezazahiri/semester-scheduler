import React, { useEffect, useState } from "react";
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
import PhoneNumberStep from "@/components/PasswordRecovery/PhoneNumberStep";
import OTPCheckStep from "@/components/PasswordRecovery/OTPCheckStep";
import RecoverPasswordStep from "@/components/PasswordRecovery/RecoverPasswordStep";
import {
  checkOTPService,
  getOtpService,
  setOtpService,
} from "@/services/student.service";
import { cleanPhoneNumber } from "@/utils/phoneNumber.utils";
import showToast from "@/utils/showToast";

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
  const [timerSeconds, setTimerSeconds] = useState(120);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const phoneNumberSubmitHandler = async (value: string) => {
    setPhoneNumber(value);
    // set a random code for user with the given phoneNumber
    const cleanedPhoneNumber = cleanPhoneNumber(value);
    const res = await setOtpService(cleanedPhoneNumber);

    if (res.success) handleNext();
    else if (res.statusCode === 402) {
      const res = await getOtpService(cleanedPhoneNumber);
      if (res.success) {
        const { expiresIn } = res.otp;
        setTimerSeconds(
          Math.floor((Number(new Date(expiresIn)) - Date.now()) / 1000)
        );
        handleNext();
      } else showToast("خطای سرور، لطفا مجددا تلاش کنید", "error", 2500, true);
    } else showToast("ارسال کد تایید با خطا مواجه شد", "error", 2500, true);
  };

  const OTPSubmitHandler = async (value: string) => {
    setOtp(value);
    const checkOTPResult = await checkOTPService({
      code: value,
      phoneNumber: cleanPhoneNumber(phoneNumber),
    });
    if (checkOTPResult.success) handleNext();
    else showToast("کد تایید نادرست می باشد", "error", 2500, true);
  };

  const handleOtpTimerFinished = () => {
    showToast("کد تایید منقضی شده است", "error", 2500, true);
    setTimeout(() => {
      handleReset();
    }, 3000);
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
            <StepLabel
              StepIconProps={{
                sx: {
                  ".MuiStepIcon-text": {
                    fill: "#B5B9F4",
                  },
                },
              }}
            >
              {step}
            </StepLabel>
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
                    timerSeconds={timerSeconds}
                    onTimerFinished={handleOtpTimerFinished}
                  />
                )}
                {activeStep === 2 && (
                  <RecoverPasswordStep phoneNumber={phoneNumber} />
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default PasswordRecovery;
