import { isServer } from "@/services/isServer";
import jwtDecode from "jwt-decode";
import create from "zustand";
import { combine } from "zustand/middleware";
import { devtools } from "zustand/middleware";

export const accessTokenKey = "@sunya/access-token";
export const refreshTokenKey = "@sunya/refresh-token";
const tokenDataKey = "@sunya/token-data";

const getDefaultValues = () => {
  if (!isServer) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey) || "",
        refreshToken: localStorage.getItem(refreshTokenKey) || "",
        tokenData: localStorage.getItem(tokenDataKey) || "",
      };
    } catch {}
  }

  return {
    accessToken: "",
    refreshToken: "",
    tokenData: "",
  };
};

const store = combine(getDefaultValues(), (set) => ({
  setTokens: (token: { accessToken: string; refreshToken: string }) => {
    let data: any;
    try {
      data = jwtDecode(token.accessToken);
      localStorage.setItem(tokenDataKey, data.user_type);
    } catch {}

    try {
      localStorage.setItem(accessTokenKey, token.accessToken);
      localStorage.setItem(refreshTokenKey, token.refreshToken);
    } catch {}
    set({ ...token, tokenData: data.user_type });
  },
  removeTokens: () => {
    try {
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(refreshTokenKey);
      localStorage.removeItem("@sunya/sidebar-open-state");
    } catch {}
    set({ accessToken: "", refreshToken: "", tokenData: "" });
  },
}));

export const useTokenStore = create(devtools(store));
