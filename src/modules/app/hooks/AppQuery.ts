/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAppList, postApp, putApp } from "@/services/requests/app.service";

const APP_LIST_QUERY_KEY = "app_list";
const APP_LIST_MUTATION_KEY = "app_list_mutate";

const useGetList = () => {
  return useQuery([APP_LIST_QUERY_KEY], getAppList, {
    staleTime: Infinity,
  });
};

const usePost = () => {
  const queryClient = useQueryClient();

  return useMutation([APP_LIST_MUTATION_KEY], postApp, {
    onSuccess: (data) => {
      queryClient.setQueryData([APP_LIST_QUERY_KEY], (prevList: any) => [...prevList, data]);
    },
  });
};

const usePut = () => {
  const queryClient = useQueryClient();

  return useMutation([APP_LIST_MUTATION_KEY], putApp, {
    onSuccess: () => {
      // queryClient.setQueryData([APP_LIST_QUERY_KEY], (prevList: any) =>
      //   prevList.map((app: any) => (app.id === data.id ? data : app))
      // );
      queryClient.invalidateQueries([APP_LIST_QUERY_KEY]);
    },
  });
};

export const AppQuery = {
  useGetList,
  usePost,
  usePut,
};
