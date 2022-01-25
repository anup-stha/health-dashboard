/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 3:15 PM
 *
 *
 */

import {
  MemberDetailCategoryAddResponse,
  MemberDetailCategoryBody,
  MemberDetailCategoryUpdateBody,
  MemberDetailCategoryUpdateResponse,
  MemberDetailsListResponse,
  MemberListResponse,
  MemberTestListResponse,
  NullDataResponse,
  OrgMemberAddRes,
} from "@/types";
import { privateAgent } from ".";
import { useCurrentMemberStore } from "@/modules/member/useCurrentMemberStore";

export const getMembersList = (roleId: number, pageNumber: number = 1) => {
  return privateAgent
    .get<MemberListResponse>(`/member/list/${roleId}?page=${pageNumber}`)
    .then((response) => response.data.data);
};

export const getNestedMemberList = (
  roleId: number,
  parentId: number,
  pageNumber: number
) => {
  return privateAgent.get<MemberListResponse>(
    `/member/list/${roleId}/${parentId}?page=${pageNumber}`
  );
};

export const postOrgMember = (body: any) => {
  return privateAgent.post<OrgMemberAddRes>("user/store", body);
};

export const postNormalMember = (body: any) => {
  return privateAgent.post<OrgMemberAddRes>("member/store", body);
};

export const postMemberCategory = (body: MemberDetailCategoryBody) => {
  return privateAgent.post<MemberDetailCategoryAddResponse>(
    "member/detail/category/store",
    body
  );
};

export const postUpdateMemberCategory = (
  body: MemberDetailCategoryUpdateBody,
  category_id: number
) => {
  return privateAgent.post<MemberDetailCategoryUpdateResponse>(
    `member/detail/category/update/${category_id}`,
    body
  );
};

export const toggleActiveForMember = (memberId: number, active: 1 | 0) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .patch<NullDataResponse>(`member/active`, {
        member_id: memberId,
        active,
      })
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const toggleVerifiedForMember = (memberId: number, verified: 1 | 0) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .patch<NullDataResponse>(`member/verified`, {
        member_id: memberId,
        verified,
      })
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getMemberDetails = (memberId: number) => {
  return privateAgent.get<MemberDetailsListResponse>(
    `member/detail/${memberId}`
  );
};

export const addDetailsToMember = (
  roleId: number,
  memberId: number,
  data: Object
) => {
  const values = Object.values(data);
  const keys = Object.keys(data);
  const requestBody: any[] = [];
  requestBody.push(
    ...keys.map((element, index) => ({
      detail_cat_id: element.split("-")[0],
      value: values[index],
    }))
  );

  return new Promise((resolve, reject) => {
    privateAgent
      .post<any>("member/detail", {
        member_id: memberId,
        role_id: roleId,
        data: requestBody,
      })
      .then((response) => {
        const currentMember = useCurrentMemberStore.getState().member;
        const currentUser = useCurrentMemberStore.getState().user;

        if (currentMember.id === memberId) {
          useCurrentMemberStore.getState().setCurrentMember({
            ...currentMember,
            details: response.data.data,
          });
        } else {
          useCurrentMemberStore
            .getState()
            .setCurrentUser({ ...currentUser, details: response.data.data });
        }

        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getMemberTestList = (
  memberId: number,
  testCategoryId: number,
  pageNumber: number = 1
) => {
  return privateAgent
    .get<MemberTestListResponse>(
      `test/member?mid=${memberId}&tcid=${testCategoryId}&page=${pageNumber}`
    )
    .then((response) => response.data.data);
};

export const getMemberTestReportByDate = (
  memberId: number,
  from_time_stamp: number,
  to_time_stamp?: number
) => {
  if (!to_time_stamp) {
    return privateAgent.get<MemberTestListResponse>(
      `test/report?from_time_stamp=${from_time_stamp}&member_id=${memberId}`
    );
  }
  return privateAgent.get<MemberTestListResponse>(
    `test/report?from_time_stamp=${from_time_stamp}&to_time_stamp=${to_time_stamp}&member_id=${memberId}`
  );
};
