import React, { useState } from "react";
import {
  Step,
  StepLabel,
  Stepper,
  Box,
  StepContent,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneNumberStep from "@/components/ConfirmPhoneNumber/PhoneNumberStep";
import OTPCheckStep from "@/components/PasswordRecovery/OTPCheckStep";
import {
  checkOTPService,
  setConfirmationCodeService,
  setPhoneNumberService,
} from "@/services/student.service";
import { cleanPhoneNumber } from "@/utils/phoneNumber.utils";
import showToast from "@/utils/showToast";
import { useRouter } from "next/router";
const STEPS = ["وارد کردن شماره تلفن همراه", "بررسی کد تایید ارسال شده"];

function ConfirmPhoneNumber() {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(120);

  const router = useRouter();

  const handleReset = () => {
    setActiveStep(0);
  };
  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const phoneNumberSubmitHandler = async (value: string) => {
    setPhoneNumber(value);
    // set a random code for user with the given phoneNumber
    const cleanedPhoneNumber = cleanPhoneNumber(value);
    // TODO: register phone number
    const setConfirmationCodeResult = await setConfirmationCodeService(
      cleanedPhoneNumber
    );

    if (setConfirmationCodeResult.success) {
      const { expiresIn } = setConfirmationCodeResult.otp;
      setTimerSeconds(
        Math.floor((Number(new Date(expiresIn)) - Date.now()) / 1000)
      );
      handleNext();
    } else {
      if (setConfirmationCodeResult.statusCode === 400)
        showToast(
          "حساب کاربری دیگری با شماره تلفن وارد شده وجود دارد، لطفا شماره تلفن دیگری را امتحان کنید.",
          "error",
          5000,
          true
        );
      else if (setConfirmationCodeResult.statusCode === 403) {
        const { expiresIn } = setConfirmationCodeResult.otp;
        setTimerSeconds(
          Math.floor((Number(new Date(expiresIn)) - Date.now()) / 1000)
        );
        handleNext();
      } else showToast("ثبت شماره تلفن با خطا مواجه شد", "error", 2500, true);
    }
  };

  const OTPSubmitHandler = async (value: string) => {
    setOtp(value);
    const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);
    const checkOTPResult = await checkOTPService({
      code: value,
      phoneNumber: cleanedPhoneNumber,
    });
    if (checkOTPResult.success) {
      const setPhoneNumberResult = await setPhoneNumberService(
        cleanedPhoneNumber
      );

      if (setPhoneNumberResult.success) {
        handleNext();
        router.replace("/");
      } else showToast("ثبت شماره تلفن با خطا مواجه شد", "error", 2500, true);
    } else showToast("کد تایید نادرست می باشد", "error", 2500, true);
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
        pt: "140px",
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
              </Box>
              {activeStep === 1 && (
                <Button onClick={handlePrev}>مرحلۀ قبل</Button>
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
export default ConfirmPhoneNumber;
