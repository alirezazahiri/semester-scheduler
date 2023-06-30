import {
  TRecoverPasswordSchema,
  changePasswordSchema,
} from "@/utils/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/common/FormInput";
import LoadingButtonElement from "@/components/common/LoadingButtonEl";
import Link from "next/link";
import TradeMark from "@/components/common/TradeMark";
import showToast from "@/utils/showToast";
import { changePassword, recoverPassword } from "@/services/student.service";
import { cleanPhoneNumber } from "@/utils/phoneNumber.utils";

interface IProps {
  phoneNumber: string;
}

const RecoverPasswordStep: FC<IProps> = ({ phoneNumber }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const methods = useForm<TRecoverPasswordSchema>({
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

  const onSubmitHandler: SubmitHandler<TRecoverPasswordSchema> = async () => {
    setLoading(true);
    showToast("درحال ثبت گذرواژه جدید", "loading", 10000, true);
    const { newPassword } = getValues();
    const result = await recoverPassword({ newPassword, phoneNumber });
    if (result.success) {
      showToast("گذرواژه با موفقیت تغییر پیدا کرد", "success", 2500, true);
      router.replace("/");
    } else {
      showToast("بازیابی گذرواژه با خطا مواجه شد", "error", 2500, true);
    }
    setLoading(false);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    showToast("درحال ثبت گذرواژه جدید", "loading", 10000, true);
    const { newPassword } = getValues();
    const result = await recoverPassword({
      newPassword,
      phoneNumber: cleanPhoneNumber(phoneNumber),
    });
    if (result.success) {
      showToast("گذرواژه با موفقیت تغییر پیدا کرد", "success", 2500, true);
      router.replace("/");
    } else {
      showToast("بازیابی گذرواژه با خطا مواجه شد", "error", 2500, true);
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
        onSubmit={submitHandler}
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
            width: "100%",
            mt: 2,
            mx: "auto",
            color: "background.default",
            fontSize: 16,
          }}
        />
      </FormControl>
    </FormProvider>
  );
};

export default RecoverPasswordStep;
