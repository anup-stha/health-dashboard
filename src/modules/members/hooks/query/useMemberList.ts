/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/24/22, 1:56 PM
 *
 *
 */

import { useMutation, useQuery, useQueryClient } from "react-query";

import { getMembersList, postNormalMember, postOrgMember } from "@/services/requests/memberRequests";

export const useMemberList = (roleId: number, memberId?: number, pageIndex = 1, enabled?: boolean) => {
  return useQuery(["member-list", roleId, pageIndex], () => getMembersList(roleId, pageIndex), {
    enabled: roleId !== 0 && enabled,
    refetchOnWindowFocus: true,
  });
};

export const useAddPatient = () => {
  const queryClient = useQueryClient();

  return useMutation(postNormalMember, {
    onSuccess: () => {
      queryClient.invalidateQueries("member-list");
      queryClient.invalidateQueries("member-list-nested");
    },
  });
};

export const useNestedAddPatient = (parent_member_id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postNormalMember, {
    onSuccess: () => {
      queryClient.invalidateQueries("member-list");
      queryClient.invalidateQueries("member-list-nested");
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation(postOrgMember, {
    onSuccess: () => {
      queryClient.invalidateQueries("member-list");
      queryClient.invalidateQueries("member-list-nested");
    },
  });
};

export const useNestedAddUser = (parent_member_id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postOrgMember, {
    onSuccess: () => {
      queryClient.invalidateQueries("member-list");
      queryClient.invalidateQueries("member-list-nested");
    },
  });
};
