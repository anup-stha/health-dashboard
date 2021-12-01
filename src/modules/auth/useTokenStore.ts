import { LoginResponse, User } from "@/types";
import create from "zustand";
import { combine } from "zustand/middleware";
import { devtools, persist } from "zustand/middleware";

const userDataKey = "@sunya/user-data";
const initialState = {
  status: false,
  token: "",
  user: {} as User,
};

export const store = combine(initialState, (set) => ({
  setUserData: (res: LoginResponse) => {
    set({
      status: res.status,
      token: res.data.token,
      user: res.data.user,
    });
  },
  removeUserData: () => {
    set({
      status: false,
      token: "",
      user: {} as User,
    });
  },
  setToken: (token: string) => {
    set({
      token: token,
    });
  },
}));

export const useAuthStore = create(
  devtools(persist(store, { name: userDataKey }), "auth")
);
