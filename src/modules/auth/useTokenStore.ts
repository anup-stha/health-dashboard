/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
