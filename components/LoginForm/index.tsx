import { FormControl, Typography } from "@mui/material";
import React from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { setTokenCookie } from "@/utils/token.utils";
import { useRouter } from "next/router";
import { loginUser } from "@/services/student.service";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { TLoginUserSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { loginUserSchema } from "@/utils/validator";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    sid: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    sid: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler: React.FormEventHandler<
    HTMLButtonElement | HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await loginUser(formValue);

    if (result.success) {
      setSelectedCourses([]);
      setTokenCookie(result.token);
      router.replace("/");
    }

    setLoading(false);
  };

  const methods = useForm<TLoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    getValues,
  } = methods;

  const { setSelectedCourses } = useContext(SelectedCoursesContext);
  const router = useRouter();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<TLoginUserSchema> = async (values) => {
    console.log(values);
    setLoading(true);
    const { sid, password } = getValues();
    setLoading(true);

    const result = await loginUser({ sid, password });

    if (result.success) {
      setSelectedCourses([]);
      setTokenCookie(result.token);
      router.replace("/");
    }

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <FormControl
        sx={{ width: "50%", mx: "auto" }}
        component={"form"}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Typography
          variant="h4"
          component="h4"
          color="primary"
          fontWeight={500}
        >
          ورود به حساب کاربری
        </Typography>
        <FormInput
          label="شماره دانشجویی"
          // name="sid"
          // value={formValue.sid}
          // error={!!formErrors.sid}
          // helperText={formErrors.sid}
          // onChange={changeHandler}
          dir="ltr"
          required
          {...register("sid")}
        />
        <FormInput
          label="گذرواژه"
          // name="password"
          // value={formValue.password}
          // error={!!formErrors.password}
          // helperText={formErrors.password}
          // onChange={changeHandler}
          dir="ltr"
          required
          {...register("password")}
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
              textDecoration: "none",
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
    </FormProvider>
  );
};

export default LoginForm;
