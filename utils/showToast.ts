import { toast } from "react-hot-toast";

const showToast = (
  message: string,
  type: "error" | "success" | "loading",
  duration: number // miliseconds
): void => {
  toast[type](message, { duration });
};

export default showToast;
