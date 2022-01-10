/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/10/22, 8:16 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMemberTestList } from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";

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
      onSuccess: ({ data }) => {
        useMemberStore.getState().setSelectedTestDetailsInProfile(data.data);
      },
      onError: () => {
        useMemberStore.getState().clearTestDetailsInProfile();
      },
    }
  );
};
