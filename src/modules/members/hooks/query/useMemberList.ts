/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 9:28 AM
 *
 *
 */

import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  getMembersList,
  postNormalMember,
  postOrgMember,
} from "@/services/requests/memberRequests";

export const useMemberList = (
  roleId: number,
  memberId?: number,
  pageIndex = 1
) => {
  return useQuery(
    ["member-list", roleId, pageIndex],
    () => getMembersList(roleId, pageIndex),
    {
      enabled: roleId !== 0,
      refetchOnWindowFocus: true,
    }
  );
};

export const useAddPatient = () => {
  const queryClient = useQueryClient();

  return useMutation(postNormalMember, {
    onSuccess: (newMember) => {
      const role = newMember.data.data.role.id;

      const previousList: any = queryClient.getQueryData([
        "member-list",
        role,
        1,
      ]);
      previousList.list.length === 20 && previousList.list.pop();

      queryClient.setQueryData(["member-list", role, 1], () => ({
        list: [newMember.data.data, ...previousList.list],
        pagination: previousList.pagination,
      }));
    },
  });
};

export const useNestedAddPatient = (parent_member_id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postNormalMember, {
    onSuccess: (newMember) => {
      const role = newMember.data.data.role.id;

      const previousList: any = queryClient.getQueryData([
        "member-list-nested",
        role,
        parent_member_id,
        1,
      ]);
      previousList.list.length === 20 && previousList.list.pop();

      queryClient.setQueryData(
        ["member-list-nested", role, parent_member_id, 1],
        () => ({
          list: [newMember.data.data, ...previousList.list],
          pagination: previousList.pagination,
        })
      );
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation(postOrgMember, {
    onSuccess: (newMember) => {
      const role = newMember.data.data.role.id;
      const previousList: any = queryClient.getQueryData([
        "member-list",
        role,
        1,
      ]);
      previousList.list.length === 20 && previousList.list.pop();
      queryClient.setQueryData(["member-list", role, 1], () => ({
        list: [newMember.data.data, ...previousList.list],
        pagination: previousList.pagination,
      }));
    },
  });
};

export const useNestedAddUser = (parent_member_id: number) => {
  const queryClient = useQueryClient();

  return useMutation(postOrgMember, {
    onSuccess: (newMember) => {
      const role = newMember.data.data.role.id;
      const previousList: any = queryClient.getQueryData([
        "member-list-nested",
        role,
        parent_member_id,
        1,
      ]);
      previousList.list.length === 20 && previousList.list.pop();
      queryClient.setQueryData(
        ["member-list-nested", role, parent_member_id, 1],
        () => ({
          list: [newMember.data.data, ...previousList.list],
          pagination: previousList.pagination,
        })
      );
    },
  });
};
