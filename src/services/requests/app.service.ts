/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/2/22, 4:56 PM
 *
 *
 */

import { AxiosResponse } from "axios";

import { StatusType } from "@/types";
import { privateAgent } from "@/services/requests/index";

type SignedUrlBody = {
  member_id: number;
  file_name: string[];
  type: "app/release";
};

type SignedUrlResponse = StatusType & {
  data: {
    file: string;
    public_url: string;
    put_url: string;
  }[];
};

type putUrlBody = {
  file: File;
};

type App = {
  id: number;
  name: string;
  slug: string;
  application_id: string;
  secret_key: string;
};

type AppListResponse = StatusType & {
  data: App[];
};

type AppCreateResponse = StatusType & {
  data: App;
};

export type AppRelease = {
  id: number;
  name: string;
  version: number;
  code: number;
  note: string[];
  app_url: string;
};

type AppReleaseListResponse = StatusType & {
  data: AppRelease[];
};

type AppReleaseCreateResponse = StatusType & {
  data: AppRelease;
};

type AppReleaseBody = {
  app_id: number;
  name: string;
  version: number;
  code: number;
  note: string[];
  app_url: string;
};

export const getSignedUrl = ({
  member_id,
  file_name,
  type,
}: SignedUrlBody): Promise<AxiosResponse<SignedUrlResponse>> => {
  return privateAgent.post("auth/signedUrl", {
    member_id,
    data: file_name,
    type,
  });
};

export const putFile = (put_url: string, { file }: putUrlBody): Promise<AxiosResponse> => {
  return privateAgent.put(put_url, {
    file: file,
  });
};

// APP BUILDS REQUESTS

export const getAppList = async (): Promise<App[]> => {
  const response = await privateAgent.get<AppListResponse>("app/all");
  return response?.data.data;
};

export const postApp = async (body: Omit<App, "id" | "slug">): Promise<App> => {
  const response = await privateAgent.post<AppCreateResponse>("app", body);
  return response?.data.data;
};

export const putApp = async (body: Omit<App, "slug" | "application_id">): Promise<App> => {
  const response = await privateAgent.put<AppCreateResponse>(`app/${body.id}`, {
    name: body.name,
    secret_key: body.secret_key,
  });
  return response?.data.data;
};

export const getAppReleaseList = async (id: number): Promise<AppRelease[]> => {
  const response = await privateAgent.get<AppReleaseListResponse>(`app/release/all/${id}`);
  return response?.data.data;
};

export const postAppRelease = async (body: AppReleaseBody): Promise<AppRelease> => {
  const response = await privateAgent.post<AppReleaseCreateResponse>("app/release", body);
  return response?.data.data;
};

export const putAppRelease = async (body: Partial<AppRelease>): Promise<AppRelease> => {
  const response = await privateAgent.put<AppReleaseCreateResponse>(`app/release/${body.id}`, body, {
    onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
  });
  return response?.data.data;
};
