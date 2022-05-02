/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
