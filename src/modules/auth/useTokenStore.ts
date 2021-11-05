import { isServer } from "@/lib/isServer";
import create from "zustand";
import { combine } from "zustand/middleware";
import { devtools } from "zustand/middleware";

const accessTokenKey = "@sunya/access-token";
const refreshTokenKey = "@sunya/refresh-token";

const getDefaultValues = () => {
  if (!isServer) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey) || "",
        refreshToken: localStorage.getItem(refreshTokenKey) || "",
      };
    } catch {}
  }

  return {
    accessToken: "",
    refreshToken: "",
  };
};

const store = combine(getDefaultValues(), (set) => ({
  setTokens: (token: { accessToken: string; refreshToken: string }) => {
    try {
      localStorage.setItem(accessTokenKey, token.accessToken);
      localStorage.setItem(refreshTokenKey, token.refreshToken);
    } catch {}
    set(token);
  },
  removeTokens: () => {
    try {
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(refreshTokenKey);
      localStorage.removeItem("@sunya/sidebar-open-state");
    } catch {}
    set({ accessToken: "", refreshToken: "" });
  },
}));

export const useTokenStore = create(devtools(store));
