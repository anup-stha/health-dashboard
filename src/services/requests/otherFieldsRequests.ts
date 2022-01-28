/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 3:25 PM
 *
 *
 */

import { privateAgent } from "@/services/requests/index";
import {
  MedicalHistoryGetResponse,
  OtherFieldsGetResponse,
  OtherFieldsPostBody,
  OtherFieldsPostResponse,
} from "@/types";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";

export const getMedicalHistoryList = (memberId: number) => {
  return privateAgent.get<MedicalHistoryGetResponse>(
    `medical_history/${memberId}`
  );
};

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

export const postMedicalHistoryToPatient = (memberId: number, data: any) => {
  console.log(data);
  const values = Object.values(data);
  const keys = Object.keys(data);
  const requestBody: any[] = [];
  requestBody.push(
    ...keys.map((element, index) => {
      return {
        medical_history_category_id: element.split("-")[0],
        value: typeof values[index] === "number" ? values[index] : null,
        note: typeof values[index] === "string" ? values[index] : "",
      };
    })
  );

  const groupBy = (objectArray: any, property: any) => {
    return objectArray.reduce(function (acc: any, obj: any) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };
  const mergeObject = (objectA: any, objectB: any) => {
    const res: any = {};
    Object.keys({ ...objectA, ...objectB }).map((key) => {
      res[key] = objectB[key] || objectA[key];
    });
    return res;
  };

  const body = groupBy(requestBody, "medical_history_category_id");

  const finalBody = Object.values(body).map((element: any) =>
    element.length === 1
      ? mergeObject(element[0], {})
      : mergeObject(element[0], element[1])
  );
  const finalReqBody = finalBody.map((element) => ({
    ...element,
    value: element.value ? "Yes" : "No",
    note: !element.value ? "N/A" : element.note ? element.note : "N/A",
  }));

  return new Promise((resolve, reject) => {
    privateAgent
      .post<MedicalHistoryGetResponse>("medical_history/category/value/", {
        member_id: memberId,
        data: finalReqBody,
      })
      .then((response) => {
        const currentMember = useCurrentMemberStore.getState().member;
        const currentUser = useCurrentMemberStore.getState().user;

        if (currentMember.id === memberId) {
          useCurrentMemberStore.getState().setCurrentMember({
            ...currentMember,
            medical_history: response.data.data,
          });
        } else {
          useCurrentMemberStore.getState().setCurrentUser({
            ...currentUser,
            medical_history: response.data.data,
          });
        }

        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
