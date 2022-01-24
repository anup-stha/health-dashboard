/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/24/22, 10:52 AM
 *
 *
 */

import { useQuery } from "react-query";
import { getDashboardData } from "@/services/requests/authRequests";
import { useAuthStore } from "@/modules/auth/useTokenStore";

export const useDashboardQuery = () => {
  return useQuery("dashboard", () => getDashboardData("/dashboard"), {
    staleTime: Infinity,
    enabled: !!useAuthStore.getState().token,
  });
};
