/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/31/22, 2:40 PM
 *
 *
 */

import { CSSProperties } from "react";
import toast from "react-hot-toast";
import { Renderable, ValueOrFunction } from "react-hot-toast/dist/core/types";

export type toastProps = {
  type?: "success" | "error" | "promise" | "loading";
  closable?: boolean;
  promise?: Promise<any> | void;
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
        success: msgs.success
          ? msgs.success
          : (data) => {
              return `${data}`;
            },
        error: msgs.error
          ? msgs.error
          : (data) => {
              return `${data ? data.data.message : "Error"}`;
            },
      },
      { id: id }
    )
  );
};

export const toastAlert = ({
  type = "promise",
  promise,
  msgs,
  id,
}: toastProps) => {
  return (
    promise &&
    msgs &&
    toast.promise(
      promise,
      {
        loading: msgs.loading ?? "Loading Content",
        success: msgs.success
          ? msgs.success
          : (data) => {
              return `${data}`;
            },
        error: msgs.error
          ? msgs.error
          : (data) => {
              return `${data ? data.response.data.message : "Error"}`;
            },
      },
      { id: id }
    )
  );
};
