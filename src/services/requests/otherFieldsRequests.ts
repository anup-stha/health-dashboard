/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 3:24 PM
 *
 *
 */

import { privateAgent } from "@/services/requests/index";
import {
  OtherFieldsGetResponse,
  OtherFieldsPostBody,
  OtherFieldsPostResponse,
} from "@/types";

export const getOtherFieldsList = () => {
  return privateAgent.get<OtherFieldsGetResponse>("medical_history/category/");
};

export const postOtherFieldDetails = (body: OtherFieldsPostBody) => {
  return privateAgent.post<OtherFieldsPostResponse>(
    "medical_history/category/",
    body
  );
};

export const putOtherFieldDetails = (
  detailId: number,
  body: OtherFieldsPostBody
) => {
  return privateAgent.put<OtherFieldsPostResponse>(
    `medical_history/category/${detailId}`,
    body
  );
};
