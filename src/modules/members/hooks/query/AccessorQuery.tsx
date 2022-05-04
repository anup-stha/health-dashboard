/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 3:45 PM
 *
 */

import { useMutation, useQuery } from "react-query";

import { getAllDoctors, postAssignDoctorToOrganization } from "@/services/api/doctor.service";

export const useAssign = () => {
  return useMutation(postAssignDoctorToOrganization, {
    onSuccess: (data) => {
      console.info("SUCCESS");
      console.log(data);
    },
  });
};

export const useGetAllDoctors = () => {
  return useQuery(["doctors-list"], getAllDoctors, {
    onSuccess: (data) => {
      console.info("SUCCESS");
      console.log(data);
    },
  });
};

export const AccessorQuery = {
  useAssign,
  useGetAllDoctors,
};
