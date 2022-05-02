/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useQuery } from "react-query";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { getDashboardData } from "@/services/requests/authRequests";

export const useDashboardQuery = () => {
  return useQuery("dashboard", () => getDashboardData("/dashboard"), {
    staleTime: Infinity,
    enabled: !!useAuthStore.getState().token,
  });
};
