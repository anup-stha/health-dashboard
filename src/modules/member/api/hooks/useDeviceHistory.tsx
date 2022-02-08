/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/8/22, 1:31 PM
 *
 *
 */

import { useMutation, useQueryClient } from "react-query";
import { deleteUserDeviceHistory } from "@/services/requests/authRequests";

const useDelete = (member_id: number) => {
  const queryClient = useQueryClient();

  return useMutation(deleteUserDeviceHistory, {
    onSuccess: () => {
      queryClient.setQueryData(["device-list", member_id], () => []);
    },
  });
};

export { useDelete };
