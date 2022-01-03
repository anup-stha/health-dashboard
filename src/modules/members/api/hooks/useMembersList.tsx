/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/3/22, 8:13 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMembersList } from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";

export const useMembersList = (roleId: number, memberId?: number) => {
  return useQuery(
    ["member-list", roleId],
    () => getMembersList(roleId, memberId),
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
