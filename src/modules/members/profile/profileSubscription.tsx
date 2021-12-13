/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 7:32 AM
 *
 *
 */

import React from "react";
import { SubscriptionDropdown } from "@/modules/members/modal/memberSubscriptionModal";
import { Button } from "@/components/Button";
import { alert } from "@/components/Alert";
import { assignSubscriptionToMember } from "@/services/requests/subscriptionRequests";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";

type ProfileSubscriptionProps = {
  memberId: number;
};

export const ProfileSubscription: React.FC<ProfileSubscriptionProps> = ({
  memberId,
}) => {
  const { subscriptionList, selectedSubscription } = useSubscriptionStore();

  return (
    <div className=" w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
      <div className="p-6 space-y-8">
        <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
          Subscriptions
        </h1>
        <div className="flex items-center">
          {subscriptionList.length === 0 ? (
            <p className="text-2xl font-semibold text-gray-700">
              No Subscription Found. Please add a subscription to this role
            </p>
          ) : (
            <div className="w-1/3 space-y-4">
              <p className="text-2xl font-semibold text-gray-700">
                Please select a subscription to add
              </p>
              <div className="flex items-center space-x-4">
                <SubscriptionDropdown />
                <Button
                  onClick={async () => {
                    await alert({
                      promise: assignSubscriptionToMember(
                        Number(memberId),
                        Number(selectedSubscription.id)
                      ),
                      msgs: {
                        loading: "Assigning Subscription",
                      },
                      id: "assign-subscription",
                    });
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
