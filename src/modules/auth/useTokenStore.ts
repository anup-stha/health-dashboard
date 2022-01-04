/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 2:55 PM
 *
 *
 */

import { LoginResponse, Member } from "@/types";
import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

const userDataKey = "@sunya/user-data";
const initialState = {
  status: false,
  token: "",
  user: {} as Member,
};

export const store = combine(initialState, (set) => ({
  setUserData: (res: LoginResponse) => {
    set({
      status: res.status,
      token: res.data.token,
      user: res.data.user,
    });
  },
  setUserProfile: (res: Member) => {
    set((state) => ({
      ...state,
      user: res,
    }));
  },

  removeUserData: () => {
    set({
      status: false,
      token: "",
      user: {} as Member,
    });
  },
  setToken: (token: string) => {
    set({
      token: token,
    });
  },
}));

export const useAuthStore = create(
  devtools(persist(store, { name: userDataKey }), { name: "auth" })
);
