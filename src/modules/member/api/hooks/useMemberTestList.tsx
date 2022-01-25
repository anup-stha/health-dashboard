/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 8:57 PM
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
