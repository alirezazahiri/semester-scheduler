import { TChangePasswordSchema, changePasswordSchema } from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import Link from "next/link";
import TradeMark from "@/components/common/TradeMark";
import showToast from "@/utils/showToast";
import { changePassword } from "@/services/student.service";

interface Props {
  mdx?: boolean;
}

function ChangePasswordForm({ mdx }: Props) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const methods = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    register,
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
    getValues,
  } = methods;

  const router = useRouter();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<TChangePasswordSchema> = async () => {
    if (!mdx) {
      setLoading(true);
      showToast("درحال ثبت گذرواژه جدید", "loading", 10000, true);
      const { newPassword, currentPassword } = getValues();
      const result = await changePassword({ newPassword, currentPassword });
      if (result.success) {
        showToast("گذرواژه با موفقیت تغییر پیدا کرد", "success", 2500, true);
        router.replace("/");
      } else {
        if (result.statusCode === 403)
          showToast("گذرواژه نادرست می باشد", "error", 2500, true);
        else showToast("تغییر گذرواژه با خطا مواجه شد", "error", 2500, true);
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
          تغییر گذرواژه
        </Typography>
        <FormInput
          label="گذرواژه کنونی"
          dir="ltr"
          required
          {...register("currentPassword")}
        />
        <FormInput
          label="گذرواژه جدید"
          dir="ltr"
          required
          {...register("newPassword")}
        />
        <FormInput
          label="تایید گذرواژه جدید"
          dir="ltr"
          required
          {...register("confirmNewPassword")}
        />
        <LoadingButtonElement
          label="ثبت"
          loading={loading}
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          sx={{
            display: `${mdx ? "none" : ""}`
          }}
        />
        <Typography
          component="div"
          variant="caption"
          textAlign="center"
          fontSize={12}
          mt={3}
          display={`${mdx ? "none" : ""}`}
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
              mt={1}
            >
              بازیابی گذرواژه
            </Typography>
          </Link>
        </Typography>
      </FormControl>
      <TradeMark mdx={mdx} />
    </FormProvider>
  );
}

export default ChangePasswordForm;
