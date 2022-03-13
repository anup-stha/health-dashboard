/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:23 PM
 *
 *
 */

import create from "zustand";
import { combine, devtools, persist, subscribeWithSelector } from "zustand/middleware";

import { LoginResponse } from "@/types";
import { Member } from "@/modules/members/types";

const userDataKey = "@sunya/user-data";
const initialState = {
  status: false,
  token: "",
  user: {} as Member,
  guided: false,
};

export const store = combine(initialState, (set) => ({
  setGuided: (guide: boolean) => {
    set({
      guided: guide,
    });
  },

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
  devtools(subscribeWithSelector(persist(store, { name: userDataKey })), {
    name: "auth",
  })
);
