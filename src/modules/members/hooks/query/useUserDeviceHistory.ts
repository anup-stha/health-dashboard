/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useQuery } from "react-query";

import { getUserDeviceHistory } from "@/services/requests/authRequests";

export const useUserDeviceHistory = (memberId: number) => {
  return useQuery(["device-list", memberId], () => getUserDeviceHistory(memberId), {
    enabled: !!memberId,
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });
};
