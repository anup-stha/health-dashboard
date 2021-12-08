import { memberStore } from "@/modules/member/memberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import {
  MemberListResponse,
  NormalMemberAddReq,
  NormalMemberAddRes,
  OrgMemberAddReq,
} from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";

export const getMemberList = (
  id: number | string
): Promise<AxiosResponse<MemberListResponse>> => {
  return privateAgent.get(`/member/list/${id}`);
};

export const postNormalMember = (body: NormalMemberAddReq) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<NormalMemberAddRes>("user/store", body)
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

export const postOrgMember = (body: OrgMemberAddReq) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<NormalMemberAddRes>("member/store", body)
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

export const postMemberCategory = (body: any) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .post("member/detail/category/store", body)
      .then((response: any) => {
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

export const updateMemberCategory = (body: any, id: number) => {
  return new Promise((resolve, reject) => {
    privateAgent
      .post(`member/detail/category/update/${id}`, body)
      .then((response: any) => {
        // const memberDetail = useRoleStore.getState().memberCategoryList;
        // useRoleStore
        //   .getState()
        //   .addMemberDetail([...memberDetail, response.data.data]);
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
