import { FormControl } from "@mui/material";
import React from "react";
import FormInput from "@/components/common/FormInput";

const LoginForm = () => {
  return (
    <FormControl sx={{ width: "50%", mx: "auto" }}>
      <FormInput label="شماره دانشجویی" name="sid" />
      <FormInput label="گذرواژه" name="password" />
    </FormControl>
  );
};

export default LoginForm;
