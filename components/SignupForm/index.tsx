import { FormControl, Typography } from "@mui/material";
import React, { useState } from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import { TUser } from "@/types/api";
import Link from "next/link";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    sid: { content: "", error: false },
    fullname: { content: "", error: false },
    password1: { content: "", error: false },
    password2: { content: "", error: false },
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as "sid" | "fullname" | "password1" | "password2"],
        content: value,
      },
    }));
  };

  const submitHandler: React.FormEventHandler<
    HTMLButtonElement | HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    if (formValue.password1 !== formValue.password2) {
      setLoading(false);
      setFormValue((prev) => ({
        ...prev,
        password1: { ...prev.password1, error: true },
        password2: { ...prev.password2, error: true },
      }));
      return;
    }

    let obj: TUser = {
      fullname: "",
      password: "",
      sid: "",
    };
    for (const [key, value] of Object.entries(formValue))
      if (key.includes("password")) obj["password"] = value.content;
      else obj[key as keyof TUser] = value.content;

    setLoading(true);

    const response = await fetch("http://localhost:3000/api/create-user", {
      method: "POST",
      body: JSON.stringify(formValue),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
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
        ثبت نام
      </Typography>
      <FormInput
        label="شماره دانشجویی"
        name="sid"
        value={formValue.sid.content}
        error={formValue.sid.error}
        onChange={changeHandler}
        textAlign="left"
      />
      <FormInput
        label="نام و نام خانوادگی"
        name="fullname"
        value={formValue.fullname.content}
        error={formValue.fullname.error}
        onChange={changeHandler}
      />
      <FormInput
        label="گذرواژه"
        name="password1"
        value={formValue.password1.content}
        error={formValue.password1.error}
        onChange={changeHandler}
        textAlign="left"
      />
      <FormInput
        label="تایید گذرواژه"
        name="password2"
        value={formValue.password2.content}
        error={formValue.password2.error}
        onChange={changeHandler}
        textAlign="left"
      />
      <LoadingButtonElement
        label="ثبت نام"
        loading={loading}
        type="submit"
        onSubmit={submitHandler}
      />
      <Typography
        component="div"
        variant="caption"
        textAlign="center"
        fontSize={12}
        mt={3}
      >
        حساب کاربری دارید ؟
        <Link
          href="/auth/login"
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
            وارد شوید
          </Typography>
        </Link>
      </Typography>
    </FormControl>
  );
};

export default SignupForm;
