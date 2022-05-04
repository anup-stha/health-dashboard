/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
  isModal?: boolean;
  style?: CSSProperties;
  id: string;
};

export const promiseToast = async ({ promise, msgs, id, onSuccess, isModal = true }: toastProps) => {
  const errMsg = msgs.error ?? "Something Went Wrong.";

  toast.loading(msgs.loading, { id: id });
  try {
    const response = await promise;
    if (response) {
      onSuccess && onSuccess(response);
      toast.success(msgs.success, { id: id });
      return response;
    }
  } catch (e) {
    toast.error(e?.response?.data?.message ?? errMsg, { id: id });
    if (isModal) {
      throw new Error(e?.response?.data?.message ?? errMsg);
    }
  }
};
