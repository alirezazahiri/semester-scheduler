import { Box, FormControl, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import Link from "next/link";
import { useRouter } from "next/router";
import { setTokenCookie } from "@/utils/token.utils";
import { loginUser, signUpUser } from "@/services/student.service";
import { COLLEGE_ITEMS, GENDER_ITEMS } from "@/constants/index.constants";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, TCreateUserSchema } from "@/utils/validator";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import showToast from "@/utils/showToast";
import TradeMark from "@/components/common/TradeMark";
import FormSelect from "@/components/common/FormSelect";

interface Props {
  mdx?: boolean;
}

const SignupForm = ({ mdx }: Props) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const methods = useForm<TCreateUserSchema>({
    resolver: zodResolver(createUserSchema),
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

  const onSubmitHandler: SubmitHandler<TCreateUserSchema> = async () => {
    if (!mdx) {
      setLoading(true);
      const { collegeId, name, sid, password1: password, gender } = getValues();
      let result = await signUpUser({
        sid,
        password,
        collegeId,
        name,
        gender,
      });

      // login user after signup
      if (result.success) {
        showToast("درحال ورود به حساب کاربری", "loading", 10000, true);
        result = await loginUser({
          sid,
          password,
        });

        if (result.success) {
          showToast("با موفقیت وارد شدید", "success", 2500, true);
          setSelectedCourses([]);
          setTokenCookie(result.token);
          router.replace("/");
        } else
          showToast("خطا در هنگام ورود به حساب کاربری", "error", 2500, true);
      } else {
        if (result.statusCode === 403)
          showToast(
            "حساب کاربری با شماره دانشجویی وارد شده وجود دارد",
            "error",
            2500,
            true
          );
      }
      setLoading(false);
    }
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
          ثبت نام
        </Typography>
        <FormInput
          label="شماره دانشجویی"
          dir="ltr"
          required
          {...register("sid")}
        />
        <FormInput
          label="نام و نام خانوادگی"
          required
          {...register("name")}
          sx={{ pt: 2 }}
        />
        <FormSelect
          label="دانشکده"
          labelName="collegeId"
          defaultValue="00"
          items={COLLEGE_ITEMS}
          {...register("collegeId")}
        />
        <FormSelect
          label="جنسیت"
          labelName="gender"
          defaultValue="0"
          items={GENDER_ITEMS}
          {...register("gender")}
        />
        <FormInput
          label="گذرواژه"
          dir="ltr"
          required
          {...register("password1")}
        />
        <FormInput
          label="تایید گذرواژه"
          dir="ltr"
          required
          {...register("password2")}
        />
        <Box display={`${mdx ? "none" : ""}`}>
          <LoadingButtonElement
            label="ثبت نام"
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
            حساب کاربری دارید ؟
            <Link
              href="/auth/login"
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
                وارد شوید
              </Typography>
            </Link>
          </Typography>
        </Box>
      </FormControl>
      <TradeMark mdx={mdx} />
    </FormProvider>
  );
};

export default SignupForm;
