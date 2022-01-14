/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 12:05 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMembersList } from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";

export const useMembersList = (
  roleId: number,
  memberId?: number,
  pageIndex = 1
) => {
  return useQuery(
    ["member-list", roleId, pageIndex],
    () => getMembersList(roleId, pageIndex),
    {
      enabled: roleId !== 0,
      onSuccess: ({ data }) => {
        useMemberStore.getState().setMemberList(data);
        if (memberId) {
          const details = data.data.list.filter(
            (member) => member.id === memberId
          )[0];
          useMemberStore.getState().setSelectedMember(details);
        }
      },
    }
  );
};
