/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 10:11 PM
 *
 *
 */

import { useGlobalState } from "@/modules/useGlobalState";
import { privateAgent } from "@/services/requests/index";

import { GlobalStateResponse } from "@/types";

export const getGlobalStates = () => {
  return new Promise((resolve, reject) =>
    privateAgent
      .get<GlobalStateResponse>("/setup")
      .then((response) => {
        useGlobalState.getState().setBasicGlobalState(response.data.data);
        resolve("Added Successfully");
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const getOverviewData = (member_id: number) => {
  return privateAgent.get<any>(`dashboard/org_overview/${member_id}`).then((response) => response.data.data);
};
