import { toast } from "react-hot-toast";

/**
 *
 * @param message your message to notify the user
 * @param type tou can set it to three different types 'loading', 'success' and 'error'
 * @param duration amount of time in milliseconds
 * @param dismissPrevious set to 'true' if you want to dismiss all previous toasts
 */
const showToast = (
  message: string | JSX.Element,
  type: "error" | "success" | "loading",
  duration: number = 1000,
  dismissPrevious: boolean = false
): void => {
  if (dismissPrevious) toast.dismiss();
  toast[type](message, { duration });
};

export default showToast;
