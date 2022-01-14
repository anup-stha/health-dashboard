/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/14/22, 12:01 PM
 *
 *
 */
import { useQuery } from "react-query";
import { getNestedMemberList } from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";
import Router from "next/router";

export const useNestedMemberList = (
  roleId: number,
  parentId: number,
  memberId?: number,
  pageNumber: number = 1
) => {
  return useQuery(
    ["member-list-nested", roleId, parentId, pageNumber],
    () => getNestedMemberList(roleId, parentId, pageNumber),
    {
      enabled: !isNaN(roleId) || !isNaN(parentId),
      onSuccess: (response) => {
        useMemberStore.getState().setMemberListBySlug(response.data);
        try {
          if (memberId) {
            const memberDetails = response.data.data.list.filter(
              (member) => member.id === memberId
            )[0];
            useMemberStore.getState().setSelectedMemberBySlug(memberDetails);
            useMemberStore.getState().setNestedSelectedRole(memberDetails.role);
          }
        } catch (error) {
          console.log(error);
          Router.push("/404");
        }
      },
    }
  );
};
