import { FormControl, Typography } from "@mui/material";
import React from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import { useState, useEffect } from "react";
import Link from "next/link";
import { setTokenCookie } from "@/utils/token.utils";
import { useRouter } from "next/router";
import { loginUser } from "@/services/student.service";
import { useContext } from "react";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { TLoginUserSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { loginUserSchema } from "@/utils/validator";
import { useTheme } from "@mui/material/styles";
import showToast from "@/utils/showToast";
import TradeMark from "@/components/common/TradeMark";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const methods = useForm<TLoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    register,
    formState: { isSubmitSuccessful },
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

  const onSubmitHandler: SubmitHandler<TLoginUserSchema> = async () => {
    setLoading(true);
    showToast("درحال ورود به حساب کاربری", "loading", 10000, true);
    const { sid, password } = getValues();

    const result = await loginUser({ sid, password });

    if (result.success) {
      showToast("با موفقیت وارد شدید", "success", 2500, true);
      setSelectedCourses([]);
      setTokenCookie(result.token);
      router.replace("/");
    } else showToast("خطا در هنگام ورود به حساب کاربری", "error", 2500, true);

    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <FormControl
        sx={{
          width: "80%",
          [theme.breakpoints.up("md")]: {
            width: "50%",
          },
          mx: "auto",
        }}
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
          dir="ltr"
          required
          {...register("sid")}
        />
        <FormInput
          label="گذرواژه"
          dir="ltr"
          required
          {...register("password")}
        />
        <LoadingButtonElement
          label="ورود"
          loading={loading}
          type="submit"
          color="primary"
          variant="contained"
          size="large"
        />
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
      <TradeMark />
    </FormProvider>
  );
};

export default LoginForm;
