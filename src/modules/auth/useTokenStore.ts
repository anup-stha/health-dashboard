/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:23 PM
 *
 *
 */

import create from "zustand";
import { combine, devtools, persist, subscribeWithSelector } from "zustand/middleware";

import type { User } from "@/services/requests/auth.service";

const userDataKey = "@sunya/user-data";

type InitialStateType = {
  token?: string;
  user?: User;
  guided: boolean;
  service_url?: string;
};

const initialState: InitialStateType = {
  token: "",
  user: undefined,
  guided: false,
  service_url: undefined,
};

export const store = combine(initialState, (set) => ({
  setGuided: (guide: boolean) => {
    set({
      guided: guide,
    });
  },

  setUserData: (user: User) => {
    set({
      user,
    });
  },

  setToken: (token: string) => {
    set({
      token: token,
    });
  },

  setServiceUrl: (service_url: string) => {
    set({
      service_url,
    });
  },

  setUserProfile: (res: User) => {
    set((state) => ({
      ...state,
      user: res,
    }));
  },

  removeUserData: () => {
    set({
      service_url: undefined,
      token: "",
      user: undefined,
    });
  },
}));

export const useAuthStore = create(
  devtools(subscribeWithSelector(persist(store, { name: userDataKey })), {
    name: "auth",
  })
);
