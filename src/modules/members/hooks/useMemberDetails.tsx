/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 1:47 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMemberDetails } from "@/services/requests/memberRequests";
import { memberStore } from "@/modules/members/memberStore";

export const useMemberDetails = (memberId: number) => {
  return useQuery(
    ["member-details", memberId],
    () => getMemberDetails(memberId),
    {
      enabled: !!memberId,
      staleTime: Infinity,
      retry: false,
      onSuccess: (data) =>
        memberStore.getState().setSelectedMemberDetails(data),
      onError: ({}) => {
        memberStore.getState().setSelectedMemberDetails([]);
      },
    }
  );
};
