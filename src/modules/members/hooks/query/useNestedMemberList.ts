/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 11:47 AM
 *
 *
 */
import { useQuery } from "react-query";

import { getNestedMemberList } from "@/services/requests/memberRequests";

export const useNestedMemberList = (
  roleId: number,
  parentId: number,
  memberId?: number,
  pageNumber = 1
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
