/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/31/21, 1:51 PM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  MemberUpdateBody,
  MemberUpdateResponse,
  NullDataResponse,
  ProfileRequestResponse,
  Role,
} from "@/types";
import Router from "next/router";
import { privateAgent, publicAgent } from ".";
import { useGlobalState } from "@/modules/useGlobalState";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { queryClient } from "@/pages/_app";

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
        useMemberStore
          .getState()
          .setSelectedRole({ id: 0, name: "Choose any role" } as Role);
        queryClient.clear();
        Router.push("/");
        resolve("Logged Out Successfully");
      })
      .catch(() => {
        useAuthStore.getState().removeUserData();
        useGlobalState.getState().clearGlobalState();
        queryClient.clear();

        Router.push("/");
        resolve("Logged Out Successfully");
      })
  );
};

export const getCurrentUserProfile = () => {
  return new Promise<ProfileRequestResponse>((resolve, reject) => {
    privateAgent
      .get<ProfileRequestResponse>("auth/me")
      .then((response) => {
        useAuthStore.getState().setUserProfile(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getDashboardData = (url: string) =>
  privateAgent.get<any>(url).then((response) => {
    return response.data.data;
  });

export const updateUserProfile = (
  profileId: number,
  body: MemberUpdateBody
) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .post<MemberUpdateResponse>(`member/update/${profileId}`, body)
      .then((response) => {
        getCurrentUserProfile().then(() => resolve(response.data.message));
        const newList = useMemberStore
          .getState()
          .memberList.map((element) =>
            element.id === profileId ? response.data.data : element
          );
        useMemberStore.getState().setOnlyMemberList(newList);
        useMemberStore.getState().setSelectedMember(response.data.data);

        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const changePassword = (old_password: string, new_password: string) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .patch<NullDataResponse>("auth/change_password", {
        old_password,
        new_password,
      })
      .then(async (response) => {
        await getCurrentUserProfile().then(() =>
          resolve(response.data.message)
        );
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
