/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { alert } from "@/components/Alert";

import { useRoleStore } from "@/modules/roles/useRoleStore";
import { postMemberCategory, postUpdateMemberCategory } from "@/services/requests/memberRequests";

import { MemberDetailCategoryBody, MemberDetailCategoryUpdateBody } from "@/types";

export const postMemberCategoryToast = (body: MemberDetailCategoryBody) => {
  const postMemberCategoryPromise = new Promise((resolve, reject) =>
    postMemberCategory(body)
      .then((response) => {
        const memberDetail = useRoleStore.getState().memberCategoryList;
        useRoleStore.getState().addMemberDetail([response.data.data, ...memberDetail]);
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

export const postUpdateMemberCategoryToast = (body: MemberDetailCategoryUpdateBody, category_id: number) => {
  const postUpdateMemberCategoryPromise = new Promise((resolve, reject) =>
    postUpdateMemberCategory(body, category_id)
      .then((response) => {
        const updatedArray = useRoleStore
          .getState()
          .memberCategoryList.map((category) =>
            category.id === response.data.data.id ? response.data.data : category
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
