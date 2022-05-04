/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 3:07 PM
 *
 */

import { ApiEmptyArrayResponse } from "@/models/api.model";
import { Member } from "@/modules/members/types";
import { privateAgent } from "@/services/requests";

import { PaginationObject, StatusType } from "@/types";

type AssignDoctorParams = {
  doctor_id: number;
  member_id: number;
};

export type GetPatientsParams = {
  patient_role_id?: number;
  patient_parent_id: number;
  page?: number;
};

type DoctorsList = {
  list: Member[];
  pagination: PaginationObject;
};

type DoctorListResponse = StatusType & {
  data: DoctorsList;
};

type OrganizationList = Member[];

type OrganizationListResponse = StatusType & {
  data: OrganizationList;
};

export const postAssignDoctorToOrganization = async ({ doctor_id, member_id }: AssignDoctorParams): Promise<[]> => {
  const response = await privateAgent.post<ApiEmptyArrayResponse>(
    `reportAccess/${doctor_id}/assign/member/${member_id}`
  );
  return response?.data.data;
};

export const getAllDoctors = async (): Promise<DoctorsList> => {
  const response = await privateAgent.get<DoctorListResponse>("reportAccess/lists/all");
  return response?.data.data;
};

export const getAllOrganizations = async (member_id: number): Promise<OrganizationList> => {
  const response = await privateAgent.get<OrganizationListResponse>(`reportAccess/organizations?mid=${member_id}`);
  return response?.data.data;
};

export const getAllPatients = async ({
  patient_parent_id,
  patient_role_id = 5,
  page,
}: GetPatientsParams): Promise<DoctorsList> => {
  const response = await privateAgent.get<DoctorListResponse>(
    `reportAccess/members/${patient_role_id}/${patient_parent_id}?page=${page}`
  );
  return response?.data.data;
};
