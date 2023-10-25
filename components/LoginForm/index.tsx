import { Box, FormControl, Typography } from "@mui/material";
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

interface Props {
  mdx?: boolean;
}

const LoginForm = ({ mdx }: Props) => {
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
    if (!mdx) {
      setLoading(true);
      showToast("درحال ورود به حساب کاربری", "loading", 10000, true);
      const { sid, password } = getValues();

      const result = await loginUser({ sid, password });

      if (result.success) {
        showToast("با موفقیت وارد شدید", "success", 2500, true);
        setSelectedCourses([]);
        setTokenCookie(result.token);
        router.replace("/");
      } else {
        if (result.statusCode === 401)
          showToast("گذرواژه یا نام کاربری اشتباه است", "error", 2500, true);
        else showToast("خطا در هنگام ورود به حساب کاربری", "error", 2500, true);
      }

      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{display: "grid", gridTemplateRows: "100% .1fr", width: "100%"}}>
      <FormControl
        sx={{
          width: "80%",
          [theme.breakpoints.up("md")]: {
            width: "50%",
          },
          mx: "auto",
          pt: "70px",
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
        <Box display={`${mdx ? "none" : ""}`}>
          <LoadingButtonElement
            label="ورود"
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
              },
            }}
          >
            <Typography
              component="div"
              variant="caption"
              textAlign="center"
              fontSize={12}
              mt={3}
              display="flex"
              alignItems="center"
              sx={{
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                  alignItems: "center",
                },
              }}
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
                >
                  ساخت حساب کاربری
                </Typography>
              </Link>
            </Typography>
            <Typography
              component="div"
              variant="caption"
              textAlign="center"
              fontSize={12}
              mt={3}
              display="flex"
              alignItems="center"
              sx={{
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                  alignItems: "center",
                },
              }}
            >
              گذرواژه ام را فراموش کرده ام
              <Link
                href="/password-recovery"
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
                >
                  بازیابی گذرواژه
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </FormControl>
      <TradeMark mdx={mdx} />
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
