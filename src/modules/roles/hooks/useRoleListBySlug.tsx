/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 11:46 AM
 *
 *
 */

import { useQuery } from "react-query";
import { getRoleListBySlug } from "@/services/requests/roleRequests";
import { useRoleStore } from "@/modules/roles/useRoleStore";

export const useRoleListBySlug = (role_slug?: string) => {
  return useQuery(
    ["roles_by_slug", role_slug],
    () => (role_slug ? getRoleListBySlug(role_slug) : null),
    {
      retry: false,
      enabled: !!role_slug,
      onSuccess: (response) => {
        response && useRoleStore.getState().setRoleListBySlug(response.data);
      },
    }
  );
};
