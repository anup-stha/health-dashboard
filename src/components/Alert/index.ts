import { CSSProperties } from "react";
import toast from "react-hot-toast";
import { Renderable, ValueOrFunction } from "react-hot-toast/dist/core/types";

export type toastProps = {
  type?: "success" | "error" | "promise" | "loading";
  closable?: boolean;
  promise?: Promise<any>;
  msgs?: {
    loading?: Renderable;
    success?: ValueOrFunction<Renderable, unknown>;
    error?: ValueOrFunction<Renderable, any>;
  };
  style?: CSSProperties;
  id: string;
};

export const alert = ({ type = "promise", promise, msgs, id }: toastProps) => {
  return (
    promise &&
    msgs &&
    toast.promise(
      promise,
      {
        loading: msgs.loading ?? "Loading Content",
        success: msgs.success ? msgs.success : (data) => `${data}`,
        error: msgs.error ? msgs.error : (data) => `${data}`,
      },
      { id: id }
    )
  );
};
