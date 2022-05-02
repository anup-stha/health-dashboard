/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
