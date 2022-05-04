/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useQuery } from "react-query";

import { getMemberTestList } from "@/services/requests/memberRequests";

export const useMemberTestList = (memberId: number, testCategoryId: number, pageNumber?: number) => {
  return useQuery(
    ["member-test-list", memberId, testCategoryId, pageNumber],
    () => getMemberTestList(memberId, testCategoryId, pageNumber),
    {
      enabled: !!memberId && !!testCategoryId,
    }
  );
};
