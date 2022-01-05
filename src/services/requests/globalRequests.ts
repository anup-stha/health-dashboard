/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/5/22, 11:30 AM
 *
 *
 */

import { GlobalStateResponse } from "@/types";
import { privateAgent } from "@/services/requests/index";
import { useGlobalState } from "@/modules/useGlobalState";

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
