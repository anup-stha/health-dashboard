import { memberStore } from "@/modules/member/memberStore";
import {
  MemberListResponse,
  OrgMemberAddRequest,
  OrgMemberAddResponse,
} from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";

export const getMemberList = (
  id: number | string
): Promise<AxiosResponse<MemberListResponse>> => {
  return privateAgent.get(`/member/list/${id}`);
};

export const postOrganisationMember = (body: OrgMemberAddRequest) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<OrgMemberAddResponse>("user/store", body)
      .then((response) => {
        memberStore
          .getState()
          .getMemberListFromServer(response.data.data.role.id);
        resolve("Added Succesfully");
      })
      .catch((error) => {
        reject(error.message);
      })
  );
};
