/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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

export const useSideBarStore = create(devtools(persist(store, { name: openState }), { name: "sidebar" }));
