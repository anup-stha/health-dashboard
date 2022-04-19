/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 3/5/22, 8:16 PM
 *
 *
 */

import Cookies from "js-cookie";
import Router from "next/router";
import { toast } from "react-hot-toast";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { DeviceListResponse, StringResponse } from "@/modules/members/types";
import { useGlobalState } from "@/modules/useGlobalState";
import { queryClient } from "@/pages/_app";
import { getGlobalStates } from "@/services/requests/globalRequests";

import { privateAgent, publicAgent } from ".";

import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  MemberUpdateBody,
  MemberUpdateResponse,
  NullDataResponse,
  ProfileRequestResponse,
} from "@/types";

export const login = (loginRequest: LoginRequest) => {
  return new Promise((resolve, reject) =>
    publicAgent
      .post<LoginResponse>(`auth/login`, {
        email: loginRequest.email,
        password: loginRequest.password,
        device_type: "w",
        device_details: window.navigator.userAgent,
      })
      .then(async (response) => {
        Cookies.set("token", response.data.data.token, {
          domain: ".sunya.health",
          path: "/",
        });

        Cookies.set("redirect_url", "https://school.sunya.health", {
          domain: ".sunya.health",
          path: "/",
        });

        try {
          const globalStateResponse = await getGlobalStates();
          if (globalStateResponse) {
            useAuthStore.getState().setUserData(response.data);
            if (!useAuthStore.getState().guided) useAuthStore.getState().setGuided(false);
            Router.push("/dashboard");
            resolve("Logged In Successfully");
          }
        } catch (e) {
          toast.error(e.response.data.message);
        }
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
        Router.push("/").then(() => {
          useAuthStore.getState().removeUserData();
          useCurrentMemberStore.persist.clearStorage();
          useCurrentMemberStore.getState().clearCurrentMemberStore();
          useGlobalState.getState().clearGlobalState();
          queryClient.clear();
          resolve("Logged Out Successfully");
        });
      })
      .catch(() => {
        useAuthStore.getState().removeUserData();
        useGlobalState.getState().clearGlobalState();
        useCurrentMemberStore.getState().clearCurrentMemberStore();
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
        resolve(response.data);
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

export const updateUserProfile = (profileId: number, body: MemberUpdateBody) => {
  const { district, province, city, address, ...rest } = body;

  return new Promise((resolve, reject) => {
    privateAgent
      .post<MemberUpdateResponse>(`member/update/${profileId}`, {
        ...rest,
        address: `${city ?? ""}, ${district ?? ""}, ${province ?? ""} - ${address}`,
      })
      .then((response) => {
        const member = useCurrentMemberStore.getState().member;
        const user = useCurrentMemberStore.getState().user;
        const loggedInUser = useAuthStore.getState().user;

        if (loggedInUser.id === response.data.data.id) {
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
  return privateAgent.get<DeviceListResponse>(`auth/devices/${member_id}`).then((response) => response.data.data);
};

export const deleteUserDeviceHistory = (member_id: number) => {
  return privateAgent.delete<StringResponse>(`auth/devices/${member_id}`);
};

export const resetPassword = async (member_id: number): Promise<string> => {
  const response = await privateAgent.patch<StringResponse>(`auth/reset/${member_id}`);
  return `Your new password is ${response.data.data}`;
};
