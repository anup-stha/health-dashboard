/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 12:09 PM
 *
 *
 */

import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteUserDeviceHistory, getUserDeviceHistory } from "@/services/requests/authRequests";

const useDelete = (member_id: number) => {
  const queryClient = useQueryClient();

  return useMutation(deleteUserDeviceHistory, {
    onSuccess: () => {
      queryClient.setQueryData(["device-list", member_id], () => []);
    },
  });
};

const useList = (member_id: number) => {
  return useQuery(["device-list", member_id], () => getUserDeviceHistory(member_id), {
    enabled: !!member_id,
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });
};

export const DeviceHistoryQuery = { useDelete, useList };
