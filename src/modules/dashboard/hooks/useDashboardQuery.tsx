/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 12:29 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getDashboardData } from "@/services/requests/authRequests";

export const useDashboardQuery = () => {
  return useQuery("dashboard", () => getDashboardData("/dashboard"));
};
