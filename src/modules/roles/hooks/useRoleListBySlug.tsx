/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 10:33 AM
 *
 *
 */

import { useQuery } from "react-query";
import { getRoleListBySlug } from "@/services/requests/roleRequests";
import { useRoleStore } from "@/modules/roles/useRoleStore";

export const useRoleListBySlug = (role_slug: string) => {
  return useQuery(
    ["roles_by_slug", role_slug],
    () => getRoleListBySlug(role_slug),
    {
      enabled: !!role_slug,
      onSuccess: (response) => {
        response && useRoleStore.getState().setRoleListBySlug(response.data);
      },
    }
  );
};
