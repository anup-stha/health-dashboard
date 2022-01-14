/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 3:48 PM
 *
 *
 */

import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

const openState = "@sunya/sidebar-open-state";

const initialState = {
  open: false,
};

export const store = combine(initialState, (set) => ({
  toggleOpen: () => {
    set((state) => ({
      open: !state.open,
    }));
  },

  setOpen: (open: boolean) => {
    set({
      open,
    });
  },
}));

export const useSideBarStore = create(
  devtools(persist(store, { name: openState }), { name: "sidebar" })
);
