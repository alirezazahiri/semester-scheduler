import { FormControl, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuItem } from "@mui/material";
import { Select, InputLabel } from "@mui/material";
import { setTokenCookie } from "@/utils/token.utils";
import { loginUser, signUpUser } from "@/services/student.service";
import { COLLEGE_ITEMS } from "@/constants/index.constants";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, TCreateUserSchema } from "@/utils/validator";
import { useEffect } from "react";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
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

  const onSubmitHandler: SubmitHandler<TCreateUserSchema> = async (values) => {
    setLoading(true);
    const { collegeId, name, sid, password1: password } = getValues();
    let result = await signUpUser({
      sid,
      password,
      collegeId,
      name,
    });

    // login user after signup
    if (result.success) {
      result = await loginUser({
        sid,
        password,
      });

      if (result.success) {
        setSelectedCourses([]);
        setTokenCookie(result.token);
        router.replace("/");
      }
    }
    setLoading(false);
  };

  return (
    <FormProvider {...methods} >
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
        <FormControl sx={{ my: 1, mb: 0.5 }}>
          <InputLabel htmlFor="college-id-select" id="college-id-label" required>
            دانشکده
          </InputLabel>
          <Select
            labelId="college-id-label"
            id="college-id-select"
            label="دانشکده"
            defaultValue="00"
            sx={{
              textAlign: "right",
            }}
            {...register("collegeId")}
            required
          >
            {[...COLLEGE_ITEMS].map((item) => (
              <MenuItem key={item.name} value={item.value} dir="rtl">
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <LoadingButtonElement label="ثبت نام" loading={loading} type="submit" />
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
      </FormControl>
    </FormProvider>
  );
};

export default SignupForm;
