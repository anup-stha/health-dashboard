/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/22/22, 8:04 PM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { getCurrentUserProfile } from "@/services/requests/authRequests";

import { privateAgent } from ".";

import {
  MemberBulkData,
  MemberBulkDataWithDetails,
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

export const getMembersList = (roleId: number, pageNumber = 1) => {
  return privateAgent
    .get<MemberListResponse>(`/member/list/${roleId}?page=${pageNumber}`)
    .then((response) => response.data.data);
};

export const getNestedMemberList = (roleId: number, parentId: number, pageNumber: number, filterParams?: string) => {
  return filterParams
    ? privateAgent
        .get<MemberListResponse>(`/member/list/${roleId}/${parentId}?page=${pageNumber}&${filterParams}`)
        .then((response) => response.data.data)
    : privateAgent
        .get<MemberListResponse>(`/member/list/${roleId}/${parentId}?page=${pageNumber}`)
        .then((response) => response.data.data);
};

export const postOrgMember = (body: any) => {
  const { district, province, city, address, ...rest } = body;
  return privateAgent.post<OrgMemberAddRes>("user/store", {
    ...rest,
    address: `${city ?? ""}, ${district ?? ""}, ${province ?? ""} - ${address}`,
  });
};

export const postNormalMember = (body: any) => {
  const { district, province, city, address, ...rest } = body;
  return privateAgent.post<OrgMemberAddRes>("member/store", {
    ...rest,
    address: `${city ?? ""}, ${district ?? ""}, ${province ?? ""} - ${address}`,
  });
};

export const postMemberCategory = (body: MemberDetailCategoryBody) => {
  return privateAgent.post<MemberDetailCategoryAddResponse>("member/detail/category/store", body);
};

export const postUpdateMemberCategory = (body: MemberDetailCategoryUpdateBody, category_id: number) => {
  return privateAgent.post<MemberDetailCategoryUpdateResponse>(`member/detail/category/update/${category_id}`, body);
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
  return privateAgent.get<MemberDetailsListResponse>(`member/detail/${memberId}`);
};

export const addDetailsToMember = (roleId: number, memberId: number, data: Record<string, any>) => {
  const values = Object.values(data);
  const keys = Object.keys(data);
  const requestBody: any[] = [];
  requestBody.push(
    ...keys.map((element, index) => ({
      detail_category_id: element.split("-")[0],
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
        const loggedInUser = useAuthStore.getState().user;

        if (loggedInUser?.id === memberId) {
          getCurrentUserProfile().then(() => resolve(response.data.message));
        } else if (currentMember.id === memberId) {
          useCurrentMemberStore.getState().setCurrentMember({
            ...currentMember,
            details: response.data.data,
          });
        } else if (currentUser.id === memberId) {
          useCurrentMemberStore.getState().setCurrentUser({ ...currentUser, details: response.data.data });
        }

        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getMemberTestList = (memberId: number, testCategoryId: number, pageNumber = 1) => {
  return privateAgent
    .get<MemberTestListResponse>(`test/member?mid=${memberId}&tcid=${testCategoryId}&page=${pageNumber}`)
    .then((response) => response.data.data);
};

export const getMemberTestReportByDate = (memberId: number, from_time_stamp: number, to_time_stamp?: number) => {
  if (!to_time_stamp) {
    return privateAgent.get<MemberTestListResponse>(
      `test/report?from_time_stamp=${from_time_stamp}&member_id=${memberId}`
    );
  }
  return privateAgent.get<MemberTestListResponse>(
    `test/report?from_time_stamp=${from_time_stamp}&to_time_stamp=${to_time_stamp}&member_id=${memberId}`
  );
};

export const postMemberBulk = (body: MemberBulkData) => {
  return privateAgent.post("member/bulk", body);
};

export const postMemberBulkWithDetails = (body: MemberBulkDataWithDetails) => {
  return privateAgent.post("member/bulkWithDetails", body);
};
