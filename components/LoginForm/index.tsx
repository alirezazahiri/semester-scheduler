import { FormControl, Typography } from '@mui/material';
import React from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import { useState } from "react";
import Link from 'next/link';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    sid: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler: React.FormEventHandler<
    HTMLButtonElement | HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify(formValue),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    console.log(data);

    setLoading(false);
  };

  return (
    <FormControl
      sx={{ width: "50%", mx: "auto" }}
      component={"form"}
      onSubmit={submitHandler}
    >
      <Typography variant="h4" component="h4" color="primary" fontWeight={500}>
        ورود به حساب کاربری
      </Typography>
      <FormInput
        label="شماره دانشجویی"
        name="sid"
        value={formValue.sid}
        onChange={changeHandler}
        textAlign="left"
        />
      <FormInput
        label="گذرواژه"
        name="password"
        value={formValue.password}
        onChange={changeHandler}
        textAlign="left"
      />
      <LoadingButtonElement label="ورود" loading={loading} type="submit" />
      <Typography
        component="div"
        variant="caption"
        textAlign="center"
        fontSize={12}
        mt={3}
      >
        حساب کاربری ندارید ؟
        <Link
          href="/auth/signup"
          style={{
            margin: "0 5px",
            textDecoration: "none"
          }}
        >
          <Typography
            component="p"
            variant="caption"
            textAlign="center"
            fontSize={12}
            color="primary"
            mt={1}
          >
            ساخت حساب کاربری
          </Typography>
        </Link>
      </Typography>
    </FormControl>
  );
};

export default LoginForm;
