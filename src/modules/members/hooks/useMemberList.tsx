/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:23 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMembersList } from "@/services/requests/memberRequests";

export const useMemberList = (roleId: number, memberId?: number) => {
  return useQuery(
    ["member-list", roleId],
    () => getMembersList(roleId, memberId),
    {
      enabled: roleId !== 0,
    }
  );
};
