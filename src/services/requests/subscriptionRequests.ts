/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 5:19 PM
 *
 *
 */

/* eslint-disable camelcase */
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import {
  MemberSubscriptionDetails,
  MemberSubscriptionDetailsResponse,
  SubscriptionAddResponse,
  SubscriptionBody,
  SubscriptionListResponse,
  SubscriptionTestDetailsResponse,
} from "@/types";
import { privateAgent } from ".";
import { memberStore } from "@/modules/members/memberStore";
import useSWRImmutable from "swr/immutable";

export const listSubscription = (id: number) =>
  privateAgent
    .get<SubscriptionListResponse>(`subscription/${id}`)
    .then((response) => {
      useSubscriptionStore.getState().setSubscriptionList(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      throw new Error(error.response.message);
    });

export const listSubscriptionDetail = (subs_id: number) =>
  privateAgent
    .get<SubscriptionTestDetailsResponse>(`subscription/tests/${subs_id}`)
    .then((response) => {
      useSubscriptionStore
        .getState()
        .setSubscriptionTestDetails(response.data.data);
    });

export const addSubscription = (data: SubscriptionBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<SubscriptionAddResponse>(`subscription/`, data)
      .then((response) => {
        useSubscriptionStore
          .getState()
          .setSubscriptionList([
            ...useSubscriptionStore.getState().subscriptionList.list,
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

export const assignTestToSubscription = (
  test_cat_id: number,
  test_sub_cat_id: number,
  subscription_id: number
) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<any>(`subscription/test`, {
        test_cat_id,
        test_sub_cat_id,
        subscription_id,
      })
      .then(async (response) => {
        await listSubscriptionDetail(Number(subscription_id));

        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};

export const removeTestFromSubscription = (
  test_cat_id: number,
  test_sub_cat_id: number
) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .delete<any>(`subscription/${test_cat_id}/${test_sub_cat_id}`)
      .then((response) => {
        const filtered = useSubscriptionStore
          .getState()
          .subscriptionDetails.map((test) => ({
            ...test,
            sub_categories: test.sub_categories.filter(
              (subTest) => subTest.id !== test_sub_cat_id
            ),
          }));

        const lastFiltered = filtered.filter(
          (test) => test.sub_categories.length !== 0
        );

        useSubscriptionStore
          .getState()
          .setSubscriptionTestDetails(lastFiltered);
        resolve(response.data.message);
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
          .setSelectedMemberSubscription({} as MemberSubscriptionDetails);
        reject(error.response);
      })
  );
};

export const listMemberSubscriptionDetails = (url: string) =>
  privateAgent
    .get<MemberSubscriptionDetailsResponse>(url)
    .then((response) => {
      memberStore.getState().setSelectedMemberSubscription(response.data.data);
      useSubscriptionStore.getState().setSubscription(response.data.data.plan);
      return response.data.data;
    })
    .catch((error) => {
      memberStore
        .getState()
        .setSelectedMemberSubscription({} as MemberSubscriptionDetails);
      return error.response;
    });

export const useMemberSubsDetails = (memberId: number) => {
  return useSWRImmutable(
    `member/subscription/${memberId}`,
    listMemberSubscriptionDetails
  );
};
