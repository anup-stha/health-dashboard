/* eslint-disable no-unused-vars */

import { number } from "yup/lib/locale";

/* eslint-disable camelcase */
export interface ChartData {
  [index: string | number]: string | number | any;
}

type Id = string | number;
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type AuthToken = {
  access_token: string;
  refresh_token: string;
};

export type LogoutRequest = {
  refresh: string;
};

export type LoginRefreshRequest = {
  refresh: string;
};

export type LoginRefreshResponse = {
  access: string;
};

export type OrganisationListType = OrganisationDetailType[];

export type OrganisationDetailType = {
  id: string | number;
  meta: OrgaisationMeta;
  createdAt: string;
  name: string;
  active: boolean;
  verified: boolean;
  updatedAt: string;
  createdBy: string;
  owner: number | string;
  ownerName: string;
};

export type OrganisationRequestType = {
  meta: OrgaisationMeta;
  name: string;
  active?: boolean;
  verified?: boolean;
  owner: string;
};

export type UserType = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  userType: "Organisation" | "staff" | "patient" | "superuser";
  username: string;
};

export type UserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  user_type: "Organisation" | "staff" | "patient" | "superuser" | any;
  username: string;
};

export type UserList = User[];

export type OrgaisationMeta = {
  logo?: string;
  description?: string;
  website?: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  address?: string;
  municipality?: string;
  ward?: string;
};

type StatusType = {
  status: boolean;
  message: string;
};

type Permission = {
  id: Id;
  name: string;
  description: string;
};

export type Role = {
  id: Id;
  name: string;
  desc: string;
  member_limit: number;
  public: boolean;
  permissions: Permission[];
  member_detail_categories: Array<any>;
};

export type User = {
  id: Id;
  email: string;
  member_id: string | number;
  name: string;
  phone: string;
  address: string;
  image: string;
  active: boolean;
  verified: boolean;
  role: Role;
};

export type LoginResponse = StatusType & {
  data: {
    token: string;
    user: User;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RoleGetRequestResponse = StatusType & {
  data: Role[];
};

export type RolePostRequestResponse = StatusType & {
  data: Role;
};
