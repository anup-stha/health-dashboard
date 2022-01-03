/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/31/21, 10:08 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getMedicalHistoryList } from "@/services/requests/otherFieldsRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";

export const usePatientMedHistory = (memberId: number) => {
  return useQuery(["patient-med-history", memberId], () => getMedicalHistoryList(memberId), {
    enabled: memberId !== 0,
    onSuccess: ({ data }) => useMemberStore.getState().setPatientMedicalHistoryList(data),
  });
};
