import { FormControl, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteTokenCookie, setTokenCookie } from "@/utils/token.utils";
import { updateUser } from "@/services/student.service";
import { COLLEGE_ITEMS, GENDER_ITEMS } from "@/constants/index.constants";
import { SelectedCoursesContext } from "@/context/SelectedCoursesContext";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUpdateProfileSchema, updateProfileSchema } from "@/utils/validator";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import showToast from "@/utils/showToast";
import TradeMark from "@/components/common/TradeMark";
import FormSelect from "@/components/common/FormSelect";

interface Props {
  initialFormData: {
    sid: string;
    name: string;
    collegeId: string;
    gender: string;
  };
}

function UpdateProfileForm({ initialFormData }: Props) {
  console.log(initialFormData);

  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const methods = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialFormData,
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

  const onSubmitHandler: SubmitHandler<TUpdateProfileSchema> = async () => {
    setLoading(true);
    const { collegeId, name, sid, gender } = getValues();
    let result = await updateUser({
      sid,
      collegeId,
      name,
      gender,
    });

    if (result.success) {
      showToast("پروفایل با موفقیت به روز رسانی شد", "success", 2500, true);
      setSelectedCourses([]);
      deleteTokenCookie();
      router.replace("/auth/login");
    } else {
      if (result.statusCode === 401)
        showToast(
          "حساب کاربری با این شماره دانشجویی وجود دارد",
          "error",
          2500,
          true
        );
    }
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
          items={COLLEGE_ITEMS}
          defaultValue={initialFormData.collegeId}
          {...register("collegeId")}
        />
        <FormSelect
          label="جنسیت"
          labelName="gender"
          items={GENDER_ITEMS}
          defaultValue={initialFormData.gender}
          {...register("gender")}
        />

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
              ثبت تغییرات
            </Typography>
          </Link>
        </Typography>
      </FormControl>
      <TradeMark />
    </FormProvider>
  );
}

export default UpdateProfileForm;
