/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 3:55 PM
 *
 *
 */

import {
  postOtherFieldDetails,
  putOtherFieldDetails,
} from "@/services/requests/otherFieldsRequests";
import { alert } from "@/components/Alert";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { OtherFieldsPostBody } from "@/types";

export const postOtherFieldToast = (data: OtherFieldsPostBody) => {
  const postOtherFieldPromise = new Promise((resolve, reject) =>
    postOtherFieldDetails(data)
      .then((response) => {
        useOtherFieldsStore.getState().addInFieldList(response.data);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    type: "promise",
    promise: postOtherFieldPromise,
    msgs: {
      loading: "Adding Category",
    },
    id: "post-other-fields",
  });
};

export const putOtherFieldToast = (detailId: number, data: OtherFieldsPostBody) => {
  const putOtherFieldPromise = new Promise((resolve, reject) =>
    putOtherFieldDetails(detailId, data)
      .then((response) => {
        useOtherFieldsStore.getState().updateInFieldList(response.data);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    type: "promise",
    promise: putOtherFieldPromise,
    msgs: {
      loading: "Editing Category",
    },
    id: "post-other-fields",
  });
};
