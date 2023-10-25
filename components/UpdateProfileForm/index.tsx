import { Box, FormControl, Typography } from "@mui/material";
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
  mdx?: boolean;
}

function UpdateProfileForm({ initialFormData, mdx }: Props) {
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
    if (!mdx) {
      setLoading(true);
      const { collegeId, name, sid, gender } = getValues();
      let result = await updateUser({
        sid,
        collegeId,
        name,
        gender,
      });

      if (result.success) {
        if (result.statusCode === 400) {
          showToast("تغییری ایجاد نشد", "error", 2500, true);
        } else {
          showToast("پروفایل با موفقیت به روز رسانی شد", "success", 2500, true);
          setSelectedCourses([]);
          deleteTokenCookie();
          router.replace("/auth/login");
        }
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
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: "grid", gridTemplateRows: "100% .1fr", width: "100%" }}>
        <FormControl
          sx={{
            width: "80%",
            [theme.breakpoints.up("md")]: {
              width: "50%",
            },
            mx: "auto",
            pt: "140px",
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
            به روز رسانی پروفایل
          </Typography>
          <FormInput
            label="شماره دانشجویی"
            dir="ltr"
            required
            {...register("sid")}
          />
          <FormInput
            label="نام و نام خانوادگی"
            dir="ltr"
            required
            {...register("name")}
            sx={{ pt: 2 }}
          />
          <FormSelect
            label="دانشکده"
            labelName="collegeId"
            items={COLLEGE_ITEMS}
            defaultValue={mdx ? "" : initialFormData.collegeId}
            {...register("collegeId")}
          />
          <FormSelect
            label="جنسیت"
            labelName="gender"
            items={GENDER_ITEMS}
            defaultValue={mdx ? "" : initialFormData.gender}
            {...register("gender")}
          />
          <LoadingButtonElement
            label="ثبت تغییرات"
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            sx={{
              display: mdx ? "none" : "",
            }}
          />
        </FormControl>
        <TradeMark mdx={mdx} />
      </Box>
    </FormProvider>
  );
}

export default UpdateProfileForm;
