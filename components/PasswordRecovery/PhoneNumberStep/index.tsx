import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import { Button, FormControl, Typography, useTheme } from "@mui/material";
import React, { FC, useState } from "react";

interface IProps {
  onSubmit: (phoneNumber: string) => void;
  currentValue: string;
}

const PhoneNumberStep: FC<IProps> = ({ onSubmit, currentValue = "" }) => {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState(currentValue);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPhoneNumber(value);
  };

  const submitHandler = () => {
    // check wether the phone number is correct or not
    onSubmit(phoneNumber);
    const cleanedPhoneNumber = phoneNumber.replaceAll(" ", "");
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
        لطفا شماره تلفن همراه خود را برای دریافت کد تایید وارد کنید
      </Typography>
      <PhoneNumberInput value={phoneNumber} onChange={changeHandler} />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          mx: "auto",
          color: "background.default",
          fontSize: 16,
        }}
        disabled={
          phoneNumber.replaceAll(" ", "").replaceAll("_", "").length !== 13
        }
        fullWidth
      >
        مرحله بعد
      </Button>
    </FormControl>
  );
};

export default PhoneNumberStep;
