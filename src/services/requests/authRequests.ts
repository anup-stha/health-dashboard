/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/22/21, 10:17 PM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  ProfileRequestResponse,
} from "@/types";
import Router from "next/router";
import { privateAgent, publicAgent } from ".";
import { useGlobalState } from "@/modules/useGlobalState";
import useSWRImmutable from "swr/immutable";

export const login = (loginRequest: LoginRequest) => {
  return new Promise((resolve, reject) =>
    publicAgent
      .post<LoginResponse>(`auth/login`, {
        email: loginRequest.email,
        password: loginRequest.password,
        device_type: "w",
      })
      .then((response) => {
        useAuthStore.getState().setUserData(response.data);
        Router.push("/dashboard");
        resolve("Logged In Successfully");
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const logOut = () => {
  return new Promise((resolve) =>
    privateAgent
      .post<LogoutRequest>("auth/logout/")
      .then(() => {
        useAuthStore.getState().removeUserData();
        useGlobalState.getState().clearGlobalState();
        Router.push("/");
        resolve("Logged Out Successfully");
      })
      .catch(() => {
        useAuthStore.getState().removeUserData();
        useGlobalState.getState().clearGlobalState();

        Router.push("/");
        resolve("Logged Out Successfully");
      })
  );
};

export const getCurrentUserProfile = () => {
  return new Promise((resolve, reject) => {
    privateAgent
      .get<ProfileRequestResponse>("auth/me")
      .then((response) => {
        useAuthStore.getState().setUserProfile(response.data.data);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const getDashboardData = (url: string) =>
  privateAgent.get<any>(url).then((response) => {
    return response.data.data;
  });

export const useDashboardData = () => {
  return useSWRImmutable(`/dashboard`, getDashboardData);
};
