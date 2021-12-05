import { MemberListResponse } from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";

export const getMemberList = (
  id: number | string
): Promise<AxiosResponse<MemberListResponse>> => {
  return privateAgent.get(`/member/list/${id}`);
};
