/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 7:00 PM
 *
 *
 */

import { memberStore } from "@/modules/members/memberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import {
  MemberDetailCategoryAddResponse,
  MemberDetailCategoryBody,
  MemberDetailCategoryUpdateBody,
  MemberDetailCategoryUpdateResponse,
  MemberDetailsListResponse,
  MemberListResponse,
  NormalMemberAddReq,
  NullDataResponse,
  OrgMemberAddReq,
  OrgMemberAddRes,
} from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";

export const getMemberList = (
  id: number | string
): Promise<AxiosResponse<MemberListResponse>> => {
  return privateAgent.get(`/member/list/${id}`);
};

export const addOrgMember = (body: OrgMemberAddReq) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<OrgMemberAddRes>("user/store", body)
      .then((response) => {
        memberStore
          .getState()
          .getMemberListFromServer(response.data.data.role.id);
        resolve("Added Successfully");
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const addNormalMember = (body: NormalMemberAddReq) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<OrgMemberAddRes>("member/store", body)
      .then((response) => {
        memberStore
          .getState()
          .getMemberListFromServer(response.data.data.role.id);
        resolve("Added Succesfully");
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};

export const postMemberCategory = (body: MemberDetailCategoryBody) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .post<MemberDetailCategoryAddResponse>(
        "member/detail/category/store",
        body
      )
      .then((response) => {
        const memberDetail = useRoleStore.getState().memberCategoryList;
        useRoleStore
          .getState()
          .addMemberDetail([...memberDetail, response.data.data]);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const updateMemberCategory = (
  body: MemberDetailCategoryUpdateBody,
  id: number
) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .post<MemberDetailCategoryUpdateResponse>(
        `member/detail/category/update/${id}`,
        body
      )
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
      });
  });
};

export const toggleActiveForMember = (memberId: number, active: 1 | 0) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .patch<NullDataResponse>(`member/active`, {
        member_id: memberId,
        active,
      })
      .then((response) => {
        console.log(response);
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
  return new Promise((resolve, reject) => {
    privateAgent
      .get<MemberDetailsListResponse>(`member/detail/${memberId}`)
      .then((response) => {
        memberStore.getState().setSelectedMemberDetails(response.data.data);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
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
        memberStore.getState().setSelectedMemberDetails(response.data.data);
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
