/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 3:45 PM
 *
 */

import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllDoctors, getOrganizationDoctors, postAssignDoctorToOrganization } from "@/services/api/doctor.service";

export const useAssign = () => {
  const queryClient = useQueryClient();
  return useMutation(postAssignDoctorToOrganization, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("doctors-list");
    },
  });
};

export const useGetAllDoctors = () => {
  return useQuery(["doctors-list"], getAllDoctors);
};

export const useGetOrganizationDoctors = (organization_id?: number) => {
  return useQuery(["doctors-list", organization_id], () =>
    organization_id ? getOrganizationDoctors(organization_id) : null
  );
};

export const AccessorQuery = {
  useAssign,
  useGetAllDoctors,
  useGetOrganizationDoctors,
};
