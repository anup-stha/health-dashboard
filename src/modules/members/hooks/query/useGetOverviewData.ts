/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 10:26 AM
 *
 *
 */

import { useQuery } from "react-query";

import { getOverviewData } from "@/services/requests/globalRequests";

export const useGetOverviewData = (memberId: number) => {
  return useQuery(["overview-data", memberId], () => getOverviewData(memberId), {
    enabled: !!memberId,
    staleTime: Infinity,
  });
};
