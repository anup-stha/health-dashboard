/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/21/21, 1:04 PM
 *
 *
 */

import { SubscriptionModal } from "@/modules/subscriptions/subscriptionModal";
import { useRouter } from "next/router";

export const AlertZone = () => {
  return <div>Hello World</div>;
};

export const SubscriptionUpdateZone = ({ idX }: any) => {
  const { query } = useRouter();
  return (
    <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit this subscription
        </h1>
        <p className="text-lg font-semibold text-gray-500">
          Once you edit a subscription, you cannot edit this subscription for 3
          days. Please be certain.
        </p>
      </div>
      <SubscriptionModal type="edit" id={Number(query.id)} />
    </div>
  );
};
