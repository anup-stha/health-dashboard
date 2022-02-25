/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/25/22, 8:34 AM
 *
 *
 */

import { useMutation, useQueryClient } from "react-query";

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
      await getCurrentUserProfile();
      // useCurrentMemberStore.getState().clearCurrentMemberStore();
    },
  });
};

export const ChildRolesQuery = {
  useAssign,
  useRemove,
};
