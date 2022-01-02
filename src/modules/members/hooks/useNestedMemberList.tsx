/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/2/22, 3:16 PM
 *
 *
 */
import { useQuery } from "react-query";
import { getNestedMemberList } from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";

export const useNestedMemberList = (
  roleId: number,
  parentId: number,
  memberId?: number
) => {
  return useQuery(
    ["member-list-nested", roleId, parentId],
    () => getNestedMemberList(roleId, parentId),
    {
      enabled: roleId !== 0 || parentId !== 0,
      onSuccess: (response) => {
        if (!response) return;
        useMemberStore.getState().setMemberListBySlug(response.data);

        if (memberId) {
          const memberDetails = response.data.data.list.filter(
            (member) => member.id === memberId
          )[0];
          useMemberStore.getState().setSelectedMemberBySlug(memberDetails);
          useMemberStore.getState().setNestedSelectedRole(memberDetails.role);
        }
      },
    }
  );
};
