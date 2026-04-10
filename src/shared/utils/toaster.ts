import { Bounce, toast } from "react-toastify";
import type { ToastOptions, TypeOptions } from "react-toastify";

export const toaster = (
  type: TypeOptions,
  message: string,
  options?: ToastOptions,
) => {
  return toast(message, {
    type: type,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    ...options,
  });
};
