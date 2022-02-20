/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 8:22 PM
 *
 *
 */

import { useQuery } from "react-query";

import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { getOtherFieldsList } from "@/services/requests/otherFieldsRequests";

export const useGetOtherFieldsList = () => {
  return useQuery(["other_fields-list"], () => getOtherFieldsList(), {
    retry: false,
    staleTime: Infinity,
    onSuccess: ({ data }) => {
      useOtherFieldsStore.getState().setOthersFieldList(data);
    },
  });
};
