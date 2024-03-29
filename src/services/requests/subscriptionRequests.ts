/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

/* eslint-disable camelcase */
import Router from "next/router";
import { useQuery } from "react-query";

import { useMemberStore } from "@/modules/members/hooks/zustand/useMemberStore";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { queryClient } from "@/pages/_app";

import { privateAgent } from ".";

import {
  MemberSubscriptionDetails,
  MemberSubscriptionDetailsResponse,
  SubscriptionAddResponse,
  SubscriptionBody,
  SubscriptionListResponse,
  SubscriptionTestDetailsResponse,
  SubscriptionUpdateBody,
} from "@/types";

export const listSubscriptions = (roleId: number) => {
  return privateAgent
    .get<SubscriptionListResponse>(`subscription/${roleId}`)
    .then((response) => {
      useSubscriptionStore.getState().setSubscriptionList(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      useSubscriptionStore.getState().setSubscriptionList([]);

      return error.response;
    });
};

export const useSubscriptionList = (roleId: number) => {
  return useQuery(["subscription-list", roleId], () => listSubscriptions(roleId), {
    enabled: !!roleId || roleId === 4,
  });
};

export const listSubscriptionDetail = (subs_id: number) =>
  privateAgent.get<SubscriptionTestDetailsResponse>(`subscription/tests/${subs_id}`).then((response) => {
    useSubscriptionStore.getState().setSubscriptionTestDetails(response.data.data);
  });

export const addSubscription = (data: SubscriptionBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<SubscriptionAddResponse>(`subscription/`, data)
      .then((response) => {
        useSubscriptionStore
          .getState()
          .setSubscriptionList([...useSubscriptionStore.getState().subscriptionList.list, response.data.data]);
        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};

export const updateSubscription = (data: SubscriptionUpdateBody, subsId: number) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .put<SubscriptionAddResponse>(`subscription/${subsId}`, data)
      .then((response) => {
        const query = Router.query;
        Router.replace(`/subscriptions/${response.data.data.slug}?id=${query.id}&role=${query.role}`);
        const subscription = useSubscriptionStore.getState().subscriptionList.list;
        const updatedArray = subscription.map((subs) =>
          subs.id === response.data.data.id ? response.data.data : subs
        );
        useSubscriptionStore.getState().setSubscriptionList(updatedArray);

        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};

export const assignSubscriptionToMember = (member_id: number, subscription_id: number) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .put<any>(`subscription/member/assign`, {
        member_id: member_id,
        subscription_id: subscription_id,
      })
      .then(async (response) => {
        await getMemberSubscriptionDetails(member_id).then(() => {
          queryClient.invalidateQueries("member-subs-details");
          resolve(response.data.message);
        });
      })
      .catch((error) => reject(error.response))
  );
};

export const removeSubscriptionFromMember = (member_id: number) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .delete<any>(`subscription/member/${member_id}`)
      .then(async (response) => {
        await getMemberSubscriptionDetails(member_id).catch(() => {
          queryClient.invalidateQueries("member-subs-details");
          resolve(response.data.message);
        });
      })
      .catch((error) => reject(error.response))
  );
};

export const assignTestToSubscription = (test_cat_id: number, test_sub_cat_id: number, subscription_id: number) => {
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

export const removeTestFromSubscription = (subscription_id: number, test_cat_id: number, test_sub_cat_id: number) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .delete<any>(`subscription/${subscription_id}/${test_cat_id}/${test_sub_cat_id}`)
      .then((response) => {
        const filtered = useSubscriptionStore.getState().subscriptionDetails.map((test) => ({
          ...test,
          sub_categories: test.sub_categories.filter((subTest) => subTest.id !== test_sub_cat_id),
        }));

        const lastFiltered = filtered.filter((test) => test.sub_categories.length !== 0);

        useSubscriptionStore.getState().setSubscriptionTestDetails(lastFiltered);
        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};

export const getMemberSubscriptionDetails = (member_id: number) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .get<MemberSubscriptionDetailsResponse>(`member/subscription/${member_id}`)
      .then((response) => {
        useMemberStore.getState().setSelectedMemberSubscription(response.data.data);
        console.log(response);
        useSubscriptionStore.getState().setSubscription(response.data.data.plan);
        resolve(response.data.message);
      })
      .catch((error) => {
        useMemberStore.getState().setSelectedMemberSubscription({} as MemberSubscriptionDetails);
        reject(error.response);
      })
  );
};

export const listMemberSubscriptionDetails = (member_id: number) =>
  privateAgent
    .get<MemberSubscriptionDetailsResponse>(`member/subscription/${member_id}`)
    .then((response) => {
      useMemberStore.getState().setSelectedMemberSubscription(response.data.data);
      useSubscriptionStore.getState().setSubscription(response.data.data.plan);
      return response.data.data;
    })
    .catch((error) => {
      useMemberStore.getState().setSelectedMemberSubscription({} as MemberSubscriptionDetails);
      return error.response;
    });

export const useMemberSubsDetails = (memberId: number) => {
  return useQuery(["member-subs-details", memberId], () => listMemberSubscriptionDetails(memberId), {
    enabled: !!memberId,
  });
};

type TestBulkAssignRequestBody = {
  subscription_id: number;
  data: {
    test_cat_id: number;
    test_sub_cat_id: number;
  }[];
};

export const assignTestToSubscriptionBulk = (body: TestBulkAssignRequestBody) => {
  return new Promise((resolve, reject) =>
    privateAgent
      .post<any>(`subscription/tests`, body)
      .then(async (response) => {
        await listSubscriptionDetail(Number(body.subscription_id));
        resolve(response.data.message);
      })
      .catch((error) => reject(error.response))
  );
};
