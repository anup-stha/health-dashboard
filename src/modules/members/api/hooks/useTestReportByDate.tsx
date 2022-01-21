/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/21/22, 3:26 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMemberTestReportByDate } from "@/services/requests/memberRequests";
import toast from "react-hot-toast";

export const useTestReportByDate = (
  memberId: number,
  from_time_stamp: number,
  to_time_stamp?: number
) => {
  return useQuery(
    ["test-list"],
    () => getMemberTestReportByDate(memberId, from_time_stamp, to_time_stamp),
    {
      staleTime: Infinity,
      enabled: false,
      onError: (error: any) => {
        const { response } = error;
        toast.error(response.data.message);
      },
    }
  );
};
