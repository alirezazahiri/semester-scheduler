import { API_BASE_URL } from "@/constants/services.constants";
import { TOmitPasswordUser } from "@/context/UserContext";
import { TCreateUser, TLogin } from "@/types/api";

export const loginUser = async (formValue: {
  sid: { content: string; error: boolean };
  password: { content: string; error: boolean };
}) => {
  let obj: TLogin = {
    password: "",
    sid: "",
  };
  for (const [key, value] of Object.entries(formValue))
    obj[key as keyof TLogin] = value.content;
  console.log(obj);
  
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
};

export const signUpUser = async (formValue: {
  name: { content: string; error: boolean };
  collegeId: { content: string; error: boolean };
  sid: { content: string; error: boolean };
  password: { content: string; error: boolean };
}) => {
  let obj: TCreateUser = {
    name: "",
    collegeId: "",
    password: "",
    sid: "",
  };
  for (const [key, value] of Object.entries(formValue))
    if (key.includes("password")) obj["password"] = value.content;
    else obj[key as keyof TCreateUser] = value.content;

  const response = await fetch(`${API_BASE_URL}/user/create-user`, {
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
  const response = await fetch(`${API_BASE_URL}/user/logout`, {
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
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
};
