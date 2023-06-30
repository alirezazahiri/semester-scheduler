import React, { useContext, useState } from "react";
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
import PhoneNumberStep from "@/components/ConfirmPhoneNumber/PhoneNumberStep";
import OTPCheckStep from "@/components/PasswordRecovery/OTPCheckStep";
import {
  checkOTPService,
  setOtpService,
  setConfirmationCodeService,
  setPhoneNumberService,
} from "@/services/student.service";
import { cleanPhoneNumber } from "@/utils/phoneNumber.utils";
import showToast from "@/utils/showToast";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { setTokenCookie } from "@/utils/token.utils";

const STEPS = ["وارد کردن شماره تلفن همراه", "بررسی کد تایید ارسال شده"];

function ConfirmPhoneNumber() {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const {setUser, user} = useContext(UserContext)

  const router = useRouter()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setOtp("");
    setPhoneNumber("");
    setActiveStep(0);
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
      handleNext();
    } else {
      if (setConfirmationCodeResult.statusCode === 400)
        showToast(
          "حساب کاربری دیگری با شماره تلفن وارد شده وجود دارد، لطفا شماره تلفن دیگری را امتحان کنید.",
          "error",
          5000,
          true
        );
      else showToast("ثبت شماره تلفن با خطا مواجه شد", "error", 2500, true);
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
        const setPhoneNumberResult = await setPhoneNumberService(cleanedPhoneNumber);
        
        if (setPhoneNumberResult.success) {
            handleNext();
            router.replace("/");
        }
        else showToast("ثبت شماره تلفن با خطا مواجه شد", "error", 2500, true);
    }
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
              </Box>
              {activeStep === 1 && (
                <>
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    مرحله قبل
                  </Button>
                  <Button color="primary" onClick={handleReset} sx={{ mr: 1 }}>
                    بازنشانی
                  </Button>
                </>
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
