/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { alert } from "@/components/Alert";

import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { postOtherFieldDetails, putOtherFieldDetails } from "@/services/requests/otherFieldsRequests";

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
