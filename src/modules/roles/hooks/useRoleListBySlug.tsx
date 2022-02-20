/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 1:55 PM
 *
 *
 */

import isEmpty from "lodash/isEmpty";
import { useQuery } from "react-query";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { getRoleListBySlug } from "@/services/requests/roleRequests";

export const useRoleListBySlug = (role_slug: string) => {
  return useQuery(
    ["roles_by_slug", role_slug],
    () => getRoleListBySlug(role_slug),
    {
      enabled: !!role_slug,
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
        data && useRoleStore.getState().setRoleListBySlug(data.data);
        const role = useCurrentMemberStore.getState().userRole;
        if (isEmpty(role)) {
          useCurrentMemberStore
            .getState()
            .setCurrentUserRole(data.data.data[data.data.data.length - 1]);
        } else {
          const selectedRoleFromResponse = data.data.data.find(
            (resRole) => resRole.id === role.id
          );
          selectedRoleFromResponse &&
            useCurrentMemberStore
              .getState()
              .setCurrentUserRole(selectedRoleFromResponse);
        }
      },
    }
  );
};
