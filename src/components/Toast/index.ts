/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/9/22, 2:21 PM
 *
 *
 */

import { CSSProperties } from "react";
import toast from "react-hot-toast";
import { Renderable, ValueOrFunction } from "react-hot-toast/dist/core/types";

type toastProps = {
  closable?: boolean;
  promise: Promise<any>;
  onSuccess?: (response: any) => void;
  msgs: {
    loading: Renderable;
    success: ValueOrFunction<Renderable, unknown>;
    error?: ValueOrFunction<Renderable, any>;
  };
  style?: CSSProperties;
  id: string;
};

export const promiseToast = async ({
  promise,
  msgs,
  id,
  onSuccess,
}: toastProps) => {
  toast.loading(msgs.loading, { id: id });
  try {
    const response = await promise;
    if (response) {
      onSuccess && onSuccess(response);
      toast.success(msgs.success, { id: id });
    }
  } catch (e) {
    toast.error(e.response.data.message, { id: id });
  }
};
