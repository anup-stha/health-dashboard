/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/3/22, 1:43 PM
 *
 */

import { useQuery } from "react-query";

import { getAllOrganizations, getAllPatients, GetPatientsParams } from "@/services/api/doctor.service";

const useGetOrganization = (member_id: number) => {
  return useQuery(["doctor-org", member_id], () => getAllOrganizations(member_id), {
    enabled: member_id !== 0,
  });
};

const useGetPatients = (params: GetPatientsParams) => {
  return useQuery(["org-patient-list", params.patient_parent_id, params.patient_role_id, params.page], () =>
    getAllPatients(params)
  );
};

export const DoctorQuery = {
  useGetOrganization,
  useGetPatients,
};
