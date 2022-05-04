/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

import { BasicGlobalState } from "@/types";

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
    set({});
  },
}));

export const useGlobalState = create(devtools(persist(store, { name: "@sunya/globals" }), { name: "globals" }));
