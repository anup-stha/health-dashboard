/* eslint-disable camelcase */
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import {
  SubscriptionAddResponse,
  SubscriptionBody,
  SubscriptionListResponse,
} from "@/types";
import { AxiosResponse } from "axios";
import { privateAgent } from ".";

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
      .then((response) => resolve(response.data.message))
      .catch((error) => reject(error.response))
  );
};
