/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 3:07 PM
 *
 */

import { Role } from "@/models/role.model";

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
  role_access: {
    id: number;
    name: string;
    slug: string;
    desc: string;
  }[];
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
  parent_member_id: number;
  name: string;
  uuid: string;
  member_code: string;
  lat: number;
  lng: number;
  dob_ad: number;
  dob_bs?: number;
  age: number;
  phone: string;
  address: string;
  gender: string;
  marital_status: string;
  image: string;
  active: boolean;
  verified: boolean;
  email: string;
  can_login: string;
  ref_key: string;
  role_id: number;
  role: Role;
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

export type MemberProfileTabs =
  | "overview"
  | "members"
  | "subscriptions"
  | "billing"
  | "tests"
  | "devices"
  | "settings"
  | "doctors"
  | "medical history"
  | "patients";
