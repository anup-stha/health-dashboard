/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 6:15 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMemberDetails } from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";

export const useMemberDetails = (memberId: number) => {
  return useQuery(
    ["member-details", memberId],
    () => getMemberDetails(memberId),
    {
      enabled: !!memberId,
      retry: false,
      onSuccess: (data) =>
        useMemberStore.getState().setSelectedMemberDetails(data),
      onError: ({}) => {
        useMemberStore.getState().setSelectedMemberDetails([]);
      },
    }
  );
};
