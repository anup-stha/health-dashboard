/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/7/22, 2:06 PM
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
} from "@/types";
import Router from "next/router";
import { privateAgent, publicAgent } from ".";
import { useGlobalState } from "@/modules/useGlobalState";
import { queryClient } from "@/pages/_app";
import { getGlobalStates } from "@/services/requests/globalRequests";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { DeviceListResponse } from "@/modules/member/types";

export const login = (loginRequest: LoginRequest) => {
  return new Promise((resolve, reject) =>
    publicAgent
      .post<LoginResponse>(`auth/login`, {
        email: loginRequest.email,
        password: loginRequest.password,
        device_type: "w",
      })
      .then(async (response) => {
        useAuthStore.getState().setUserData(response.data);
        if (!useAuthStore.getState().guided)
          useAuthStore.getState().setGuided(false);

        Router.push("/dashboard");
        await getGlobalStates();
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
        Router.push("/");
        useAuthStore.getState().removeUserData();
        useCurrentMemberStore.persist.clearStorage();
        useGlobalState.getState().clearGlobalState();
        queryClient.clear();
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
        const member = useCurrentMemberStore.getState().member;
        const user = useCurrentMemberStore.getState().user;
        const loggedInUser = useAuthStore.getState().user;

        if (loggedInUser.member_id === response.data.data.id) {
          getCurrentUserProfile().then(() => resolve(response.data.message));
        } else if (member.id === response.data.data.id) {
          useCurrentMemberStore.getState().setCurrentMember(response.data.data);
        } else if (user.id === response.data.data.id) {
          useCurrentMemberStore.getState().setCurrentUser(response.data.data);
        }

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
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getUserDeviceHistory = (member_id: number) => {
  return privateAgent
    .get<DeviceListResponse>(`auth/devices/${member_id}`)
    .then((response) => response.data.data);
};
