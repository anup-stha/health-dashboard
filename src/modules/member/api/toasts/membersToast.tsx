/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/2/22, 2:37 PM
 *
 *
 */

import {
  MemberDetailCategoryBody,
  MemberDetailCategoryUpdateBody,
} from "@/types";
import {
  postMemberCategory,
  postUpdateMemberCategory,
} from "@/services/requests/memberRequests";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { alert } from "@/components/Alert";

export const postMemberCategoryToast = (body: MemberDetailCategoryBody) => {
  const postMemberCategoryPromise = new Promise((resolve, reject) =>
    postMemberCategory(body)
      .then((response) => {
        const memberDetail = useRoleStore.getState().memberCategoryList;
        useRoleStore
          .getState()
          .addMemberDetail([response.data.data, ...memberDetail]);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    promise: postMemberCategoryPromise,
    msgs: {
      loading: "Adding Member Category",
    },
    id: "member-category-toast",
  });
};

export const postUpdateMemberCategoryToast = (
  body: MemberDetailCategoryUpdateBody,
  category_id: number
) => {
  const postUpdateMemberCategoryPromise = new Promise((resolve, reject) =>
    postUpdateMemberCategory(body, category_id)
      .then((response) => {
        const updatedArray = useRoleStore
          .getState()
          .memberCategoryList.map((category) =>
            category.id === response.data.data.id
              ? response.data.data
              : category
          );

        useRoleStore.getState().addMemberDetail(updatedArray);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    promise: postUpdateMemberCategoryPromise,
    msgs: {
      loading: "Adding Member Category",
    },
    id: "member-category-toast",
  });
};
