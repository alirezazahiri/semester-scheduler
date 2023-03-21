import { TOmitPasswordUser } from "@/context/UserContext";
import { TCreateUser, TLogin, TCreateUserFormValue, TLoginUserFormValue } from "@/types/api";

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
    gender: ""
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
