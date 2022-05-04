/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */
import { useQuery } from "react-query";

import { getNestedMemberList } from "@/services/requests/memberRequests";

export const useNestedMemberList = (
  roleId: number,
  parentId: number,
  memberId?: number,
  pageNumber = 1,
  enabled?: boolean,
  filterParams?: string
) => {
  return useQuery(
    ["member-list-nested", roleId, parentId, pageNumber, filterParams],
    () => getNestedMemberList(roleId, parentId, pageNumber, filterParams),
    {
      enabled: roleId !== 0 && enabled && !isNaN(roleId),
      refetchOnWindowFocus: true,
    }
  );
};
