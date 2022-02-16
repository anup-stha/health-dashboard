/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 10:12 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getOverviewData } from "@/services/requests/globalRequests";

export const useOverviewData = (memberId: number) => {
  return useQuery(
    ["overview-data", memberId],
    () => getOverviewData(memberId),
    {
      enabled: !!memberId,
      staleTime: Infinity,
    }
  );
};
