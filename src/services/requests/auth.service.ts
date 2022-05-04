/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Role } from "@/models/role.model";
import { MemberMedicalHistory, MemberOtherDetails } from "@/modules/members/types";
import { privateAgent } from "@/services/requests/index";

import { StatusType } from "@/types";

type LoginBody = {
  email: string;
  password: string;
};

export type User = {
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

export type LoginDetails = {
  token: string;
  user: User;
  service_url: string;
};

export type LoginResponse = StatusType & {
  data: LoginDetails;
};

// API REQUESTS

export const login = async (body: LoginBody): Promise<LoginDetails> => {
  const response = await privateAgent.post<LoginResponse>("auth/login", {
    ...body,
    device_type: "w",
  });
  return response?.data.data;
};
