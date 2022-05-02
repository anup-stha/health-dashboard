/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 4:14 PM
 *
 */

import Cookies from "js-cookie";
import Router from "next/router";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { login } from "@/services/requests/auth.service";
import { getGlobalStates } from "@/services/requests/globalRequests";

const useLogin = () => {
  return useMutation(login, {
    onSuccess: async (response) => {
      const shouldRedirect = !response?.service_url?.includes("app.sunya.health");

      try {
        const globalStateResponse = await getGlobalStates();
        if (globalStateResponse) {
          if (!useAuthStore.getState().guided) useAuthStore.getState().setGuided(false);

          if (!!response?.service_url && shouldRedirect) {
            useAuthStore.getState().setUserData(response.user);
            useAuthStore.getState().setServiceUrl(response.service_url);
            Cookies.set("token", response.token, {
              domain: ".sunya.health",
              path: "/",
              expires: 100000,
            });
            Cookies.set("redirect_url", response.service_url, {
              domain: ".sunya.health",
              path: "/",
              expires: 100000000,
            });
            await Router.push(response.service_url);
          } else {
            useAuthStore.getState().setToken(response.token);
            useAuthStore.getState().setUserData(response.user);
            await Router.push("/dashboard");
          }
        }
      } catch (e) {
        toast.error(e?.response?.data?.message ?? "Login Error");
      }
    },
  });
};

export const AuthQuery = {
  useLogin,
};
