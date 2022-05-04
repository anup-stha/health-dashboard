/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import toast from "react-hot-toast";
import { useQuery } from "react-query";

import { getMemberTestReportByDate } from "@/services/requests/memberRequests";

export const useTestReportByDate = (memberId: number, from_time_stamp: number, to_time_stamp?: number) => {
  return useQuery(["test-list"], () => getMemberTestReportByDate(memberId, from_time_stamp, to_time_stamp), {
    staleTime: Infinity,
    enabled: false,
    onError: (error: any) => {
      const { response } = error;
      toast.error(response.data.message);
    },
  });
};
