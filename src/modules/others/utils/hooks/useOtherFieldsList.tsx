/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 3:03 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getOtherFieldsList } from "@/services/requests/otherFieldsRequests";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";

export const useGetOtherFieldsList = () => {
  return useQuery(["other_fields-list"], () => getOtherFieldsList(), {
    retry: false,
    onSuccess: ({ data }) => {
      useOtherFieldsStore.getState().setOthersFieldList(data);
    },
  });
};
