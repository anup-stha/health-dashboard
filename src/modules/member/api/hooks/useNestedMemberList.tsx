/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 6:46 PM
 *
 *
 */
import { useQuery } from "react-query";
import { getNestedMemberList } from "@/services/requests/memberRequests";

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
      enabled: roleId !== 0,
      refetchOnWindowFocus: true,
    }
  );
};
