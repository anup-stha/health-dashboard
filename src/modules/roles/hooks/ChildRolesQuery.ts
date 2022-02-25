/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/25/22, 2:12 PM
 *
 *
 */

import { useMutation, useQueryClient } from "react-query";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { getCurrentUserProfile } from "@/services/requests/authRequests";
import {
  assignChildRole,
  deleteChildRole,
} from "@/services/requests/roleRequests";

export const useAssign = () => {
  const queryClient = useQueryClient();

  return useMutation(assignChildRole, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("role-list");
      await getCurrentUserProfile();
    },
  });
};

export const useRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChildRole, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("role-list");
      await queryClient.invalidateQueries("role-details");
      await getCurrentUserProfile();
      useCurrentMemberStore.getState().clearCurrentMemberStore();
    },
  });
};

export const ChildRolesQuery = {
  useAssign,
  useRemove,
};
