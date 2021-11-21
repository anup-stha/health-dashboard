import { CSSProperties } from "react";
import toast from "react-hot-toast";
import { Renderable, ValueOrFunction } from "react-hot-toast/dist/core/types";

export type toastProps = {
  type: "success" | "error" | "promise" | "loading";
  closable?: boolean;
  promise?: Promise<unknown>;
  msgs?: {
    loading?: Renderable;
    success?: ValueOrFunction<Renderable, unknown>;
    error?: ValueOrFunction<Renderable, any>;
  };
  style?: CSSProperties;
};

export const defaultToastStyles: CSSProperties = {
  padding: "0.8rem 1.8rem 0.8rem 1.8rem",
  fontSize: "1.5rem",
  display: "inline-flex",
};

export const alert = ({
  type,
  promise,
  msgs,
  style = defaultToastStyles,
}: toastProps) => {
  if (type === "promise" && promise)
    return toast.promise(
      promise,
      {
        success: msgs?.success ?? "Succesful",
        loading: msgs?.loading ?? "Loading",
        error: msgs?.error ?? "Error",
      },
      {
        style: style,
      }
    );

  if (type === "success")
    return toast.success(msgs?.success ?? "Successfull", { style });
  if (type === "error") return toast.error(msgs?.error ?? "Error", { style });
  if (type === "loading")
    return toast.loading(msgs?.loading ?? "Loading", {
      style,
      duration: 1000,
    });
};
