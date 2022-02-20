/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 12:16 PM
 *
 *
 */

import { useQuery } from "react-query";

import { getMemberTestList } from "@/services/requests/memberRequests";

export const useMemberTestList = (
  memberId: number,
  testCategoryId: number,
  pageNumber?: number
) => {
  return useQuery(
    ["member-test-list", memberId, testCategoryId, pageNumber],
    () => getMemberTestList(memberId, testCategoryId, pageNumber),
    {
      enabled: !!memberId && !!testCategoryId,
    }
  );
};
