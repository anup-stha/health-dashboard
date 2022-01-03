/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/3/22, 9:17 PM
 *
 *
 */

import {
  MemberDetailCategoryBody,
  MemberDetailCategoryUpdateBody,
  NormalMemberAddReq,
  OrgMemberAddReq,
} from "@/types";
import {
  postMemberCategory,
  postNormalMember,
  postOrgMember,
  postUpdateMemberCategory,
} from "@/services/requests/memberRequests";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { alert } from "@/components/Alert";
import { useRoleStore } from "@/modules/roles/useRoleStore";

export const postOrgMemberToast = (body: OrgMemberAddReq) => {
  const postOrgMemberResponse = new Promise((resolve, reject) =>
    postOrgMember(body)
      .then((response) => {
        useMemberStore
          .getState()
          .getMemberListFromServer(response.data.data.role.id);
        resolve("Added Successfully");
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    promise: postOrgMemberResponse,
    msgs: {
      loading: "Adding User",
    },
    id: "user-add-toast",
  });
};

export const postNormalMemberToast = (body: NormalMemberAddReq) => {
  const postNormalMemberPromise = new Promise((resolve, reject) =>
    postNormalMember(body)
      .then((response) => {
        useMemberStore
          .getState()
          .getMemberListFromServer(response.data.data.role.id);
        resolve("Added Successfully");
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    promise: postNormalMemberPromise,
    msgs: {
      loading: "Adding User",
    },
    id: "member-add-toast",
  });
};

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
