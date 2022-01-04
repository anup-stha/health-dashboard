/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/4/22, 10:23 AM
 *
 *
 */

import { useQuery } from "react-query";
import { getMemberTestList } from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";

export const useMemberTestList = (memberId: number, testCategoryId: number) => {
  return useQuery(
    ["member-test-list", memberId, testCategoryId],
    () => getMemberTestList(memberId, testCategoryId),
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
