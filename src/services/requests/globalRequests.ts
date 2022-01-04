/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/4/22, 10:56 AM
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
        console.log(response);
        useGlobalState.getState().setBasicGlobalState(response.data.data);
        resolve("Added Successfully");
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};
