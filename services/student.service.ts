import { TOmitPasswordUser } from "@/context/UserContext";
import {
  TCreateUser,
  TLogin,
  TCreateUserFormValue,
  TLoginUserFormValue,
} from "@/types/api";
import {
  TChangePasswordSchema,
  TRecoverPasswordSchema,
} from "@/utils/validator";

export const loginUser = async (formValue: TLoginUserFormValue) => {
  let obj: TLogin = {
    password: "",
    sid: "",
  };
  for (const [key, value] of Object.entries(formValue))
    obj[key as keyof TLogin] = value;

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
};

export const signUpUser = async (formValue: TCreateUserFormValue) => {
  let obj: TCreateUser = {
    name: "",
    collegeId: "",
    password: "",
    sid: "",
    gender: "",
  };
  for (const [key, value] of Object.entries(formValue))
    if (key.includes("password")) obj["password"] = value;
    else obj[key as keyof TCreateUser] = value;

  const response = await fetch("/api/user/create-user", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

export const logoutUser = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

export const fetchUser: () => Promise<{
  statusCode: number;
  success: boolean;
  message: string;
  user: TOmitPasswordUser & { token: string };
}> = async () => {
  const response = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
};

export const changePassword: (
  formValue: Omit<TChangePasswordSchema, "confirmNewPassword">
) => Promise<{
  statusCode: number;
  success: boolean;
  message: string;
}> = async (formValue) => {
  const response = await fetch("/api/user/change-password", {
    method: "POST",
    body: JSON.stringify(formValue),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
};

export const recoverPassword: (
  formValue: Omit<TRecoverPasswordSchema, "confirmNewPassword"> & {
    phoneNumber: string;
  }
) => Promise<{
  statusCode: number;
  success: boolean;
  message: string;
}> = async (formValue) => {
  const response = await fetch("/api/user/recover-password", {
    method: "POST",
    body: JSON.stringify(formValue),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
};

export const setConfirmationCodeService = async (phoneNumber: string) => {
  const response = await fetch("/api/user/set-confirmation-code", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const setOtpService = async (phoneNumber: string) => {
  const response = await fetch("/api/user/set-otp", {
    method: "PATCH",
    body: JSON.stringify({ phoneNumber }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const setPhoneNumberService = async (phoneNumber: string) => {
  const response = await fetch("/api/user/set-phone-number", {
    method: "PATCH",
    body: JSON.stringify({ phoneNumber }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const checkOTPService = async ({
  code,
  phoneNumber,
}: {
  code: string;
  phoneNumber: string;
}) => {
  const response = await fetch("/api/user/check-otp-code", {
    method: "POST",
    body: JSON.stringify({ code, phoneNumber }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getOtpService = async (phoneNumber: string) => {
  const response = await fetch("/api/user/get-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};
