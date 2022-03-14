/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/2/22, 4:53 PM
 *
 *
 */

import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAppReleaseList, postAppRelease, putAppRelease } from "@/services/requests/app.service";

const APP_RELEASE_LIST_KEY = "app_release_list";
const APP_LIST_MUTATION_KEY = "app_release_list_mutate";
const APP_LIST_PUT_MUTATION_KEY = "app_release_list_put_mutate";

const useGetList = (app_id: number) => {
  return useQuery([APP_RELEASE_LIST_KEY, app_id], () => getAppReleaseList(app_id), {
    staleTime: Infinity,
    enabled: !!app_id,
  });
};

const usePost = (app_id: number) => {
  const queryClient = useQueryClient();

  return useMutation([APP_LIST_MUTATION_KEY], postAppRelease, {
    onSuccess: (data) => {
      queryClient.setQueryData([APP_RELEASE_LIST_KEY, app_id], (prevList: any) => {
        return [...prevList, data];
      });
    },
  });
};

const usePut = () => {
  const queryClient = useQueryClient();

  return useMutation([APP_LIST_PUT_MUTATION_KEY], putAppRelease, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const AppReleaseQuery = {
  useGetList,
  usePost,
  usePut,
};
