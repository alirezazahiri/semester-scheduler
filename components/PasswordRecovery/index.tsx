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
import PhoneNumberStep from "@/components/PasswordRecovery/PhoneNumberStep";
import OTPCheckStep from "@/components/PasswordRecovery/OTPCheckStep";
import RecoverPasswordStep from "@/components/PasswordRecovery/RecoverPasswordStep";
import { checkOTPService, setOtpService } from "@/services/student.service";
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    else showToast("ارسال کد تایید با خطا مواجه شد", "error", 2500, true);
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
                {activeStep === 2 && (
                  <RecoverPasswordStep phoneNumber={phoneNumber} />
                )}
              </Box>
              {activeStep === 1 && (
                <Button
                  color="inherit"
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
