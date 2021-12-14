/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 3:36 PM
 *
 *
 */

/* eslint-disable camelcase */
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import {
  MemberSubscriptionDetailsResponse,
  SubscriptionAddResponse,
  SubscriptionBody,
  SubscriptionDetails,
  SubscriptionListResponse,
} from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";
import { memberStore } from "@/modules/members/memberStore";

export const listSubscription = (
  id: number | string
): Promise<AxiosResponse<SubscriptionListResponse>> => {
  return privateAgent.get(`subscription/${id}`);
};

export const addSubscription = (data: SubscriptionBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<SubscriptionAddResponse>(`subscription/`, data)
      .then((response) => {
        useSubscriptionStore
          .getState()
          .setSubscriptionList([
            ...useSubscriptionStore.getState().subscriptionList,
            response.data.data,
          ]);
        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};

export const assignSubscriptionToMember = (
  member_id: number,
  subscription_id: number
) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .put<any>(`subscription/member/assign`, {
        member_id: member_id,
        subscription_id: subscription_id,
      })
      .then(async (response) => {
        await getMemberSubscriptionDetails(member_id).then(() => {
          resolve(response.data.message);
        });
      })
      .catch((error) => reject(error.response))
  );
};

export const getMemberSubscriptionDetails = (member_id: number) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .get<MemberSubscriptionDetailsResponse>(
        `member/subscription/${member_id}`
      )
      .then((response) => {
        memberStore
          .getState()
          .setSelectedMemberSubscription(response.data.data);
        useSubscriptionStore
          .getState()
          .setSubscription(response.data.data.plan);
        resolve(response.data.message);
      })
      .catch((error) => {
        memberStore
          .getState()
          .setSelectedMemberSubscription({} as SubscriptionDetails);
        reject(error.response);
      })
  );
};
