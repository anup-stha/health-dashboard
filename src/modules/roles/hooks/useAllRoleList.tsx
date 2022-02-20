/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 6:45 PM
 *
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
