/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useQuery } from "react-query";

import { useRoleStore } from "@/modules/roles/useRoleStore";
import { getAllRoleList } from "@/services/requests/roleRequests";

export const useAllRoleList = () => {
  return useQuery(["all_roles"], () => getAllRoleList(), {
    retry: false,
    onSuccess: ({ data }) => {
      useRoleStore.getState().setAllRoleList(data);
    },
  });
};
