import Cookies from "js-cookie";

export function setCookie(key: string, value: string) {
  Cookies.set(key, value, { expires: 7 });
}
