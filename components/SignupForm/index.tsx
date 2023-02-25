import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React from "react";
import FormInput from "@/components/common/FormInput";

const SignupForm = () => {
  return (
    <FormControl sx={{ width: "50%", mx: "auto" }}>
      <FormInput label="شماره دانشجویی" name="sid"/>
      <FormInput label="نام و نام خانوادگی" name="fullname"/>
      <FormInput label="گذرواژه" name="password1"/>
      <FormInput label="تایید گذرواژه" name="password2"/>
    </FormControl>
  );
};

export default SignupForm;
