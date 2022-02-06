/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/6/22, 1:17 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getUserDeviceHistory } from "@/services/requests/authRequests";

export const useUserDeviceHistory = (memberId: number) => {
  return useQuery(
    ["device-list", memberId],
    () => getUserDeviceHistory(memberId),
    {
      enabled: !!memberId,
      refetchOnWindowFocus: true,
      staleTime: Infinity,
    }
  );
};
