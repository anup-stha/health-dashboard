/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/8/22, 1:19 PM
 *
 *
 */

import { Permission } from "@/types";

export type MemberListResponse = {
  status: boolean;
  message: string;
  data: MemberData;
};

export type MemberRole = {
  id: number;
  name: string;
  slug: string;
  desc: string;
  permissions: Permission[];
};

export type MemberMedicalHistory = {
  id: number;
  name: string;
  detail_category_id: number;
  slug: string;
  value: string;
  note: string;
};

export type MemberOtherDetails = {
  id: number;
  name: string;
  detail_category_id: number;
  slug: string;
  value: string;
};

export type Member = {
  id: number;
  member_code: string;
  parent_member_id: number;
  member_id?: number;
  uuid: string;
  name: string;
  lat: number;
  lng: number;
  phone: string;
  dob_ad: number;
  dob_bs: string;
  gender: string;
  marital_status: string;
  address: string;
  active: boolean;
  verified: boolean;
  email: string;
  can_login: boolean;
  ref_key: string;
  role: MemberRole;
  image: string;
  medical_history: MemberMedicalHistory[];
  details: MemberOtherDetails[];
};

export type MemberListPagination = {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
};

export type MemberData = {
  list: Member[];
  pagination: MemberListPagination;
};
export type DeviceList = Device[];

export type DeviceDetail = {
  Brand: string;
  Model: string;
  ID: string;
  SDK: string;
  Manufacture: string;
  User: string;
  Type: string;
  Base: string;
  Incremental: string;
  Board: string;
  Host: string;
  FingerPrint: string;
  "Version Code": string;
};

export type Device = {
  id: number;
  device_id: string;
  os_type: string;
  app_slug: string;
  device_detail: DeviceDetail;
};

export type DeviceListResponse = {
  status: boolean;
  message: string;
  data: DeviceList;
};

export type StringResponse = {
  status: boolean;
  message: string;
  data: string;
};
