/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/5/22, 6:01 PM
 *
 *
 */

import { CurrentLoggedInMember, LoginResponse } from "@/types";
import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

const userDataKey = "@sunya/user-data";
const initialState = {
  status: false,
  token: "",
  user: {} as CurrentLoggedInMember,
};

export const store = combine(initialState, (set) => ({
  setUserData: (res: LoginResponse) => {
    set({
      status: res.status,
      token: res.data.token,
      user: res.data.user,
    });
  },
  setUserProfile: (res: CurrentLoggedInMember) => {
    set((state) => ({
      ...state,
      user: res,
    }));
  },

  removeUserData: () => {
    set({
      status: false,
      token: "",
      user: {} as CurrentLoggedInMember,
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
