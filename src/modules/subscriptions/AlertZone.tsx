/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { useRouter } from "next/router";

import { SubscriptionModal } from "@/modules/subscriptions/subscriptionModal";

export const AlertZone = () => {
  return <div>Hello World</div>;
};

export const SubscriptionUpdateZone = ({ idX }: any) => {
  const { query } = useRouter();
  return (
    <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex justify-between items-center sm:w-full sm:px-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Edit this subscription</h1>
        <p className="text-lg font-medium text-gray-500">
          Please be careful while editing. Editing a subscription may affect many things
        </p>
      </div>
      <SubscriptionModal type="edit" id={Number(query.id)} />
    </div>
  );
};
