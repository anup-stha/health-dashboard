/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:20 AM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { LoginRequest, LoginResponse, LogoutRequest } from "@/types";
import Router from "next/router";
import { privateAgent, publicAgent } from ".";
import { getRoleDetails } from "./roleRequests";
import { useGlobalState } from "@/modules/useGlobalState";

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

export const getRoleDetail = async (idX: number) => {
  await getRoleDetails(idX)
    .then((response) => {
      useRoleStore.getState().setSelectedPermission({
        current: response.data.data.permissions,
        initial: response.data.data.permissions,
        selected: [],
        deselected: [],
      });
    })
    .catch(() => {});
};
