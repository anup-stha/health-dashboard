/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:21 PM
 *
 *
 */

import { BasicGlobalState } from "@/types";
import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

const initialState: BasicGlobalState = {
  base: {
    system_version: "",
    date_format: "",
    data_types: [""],
    subscription_intervals: [""],
  },
};

const store = combine(initialState, (set) => ({
  setBasicGlobalState: (state: any) => {
    set({
      base: {
        system_version: state.system_version,
        date_format: state.date_format,
        data_types: state.data_types,
        subscription_intervals: state.subscription_intervals,
      },
    });
  },

  clearGlobalState: () => {
    set({
      base: {} as typeof initialState.base,
    });
  },
}));

export const useGlobalState = create(
  devtools(persist(store, { name: "@sunya/globals" }), "globals")
);
