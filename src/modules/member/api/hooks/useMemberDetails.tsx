/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/26/22, 10:26 AM
 *
 *
 */

import { useQuery } from "react-query";
import { getMemberDetails } from "@/services/requests/memberRequests";

export const useMemberDetails = (memberId: number) => {
  return useQuery(
    ["member-details", memberId],
    () => getMemberDetails(memberId),
    {
      enabled: !!memberId,
      retry: false,
    }
  );
};
