/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 9:29 PM
 *
 *
 */

import { SubscriptionModal } from "./subscriptionModal";
import { SubscriptionTable } from "./subscriptionTable";
import React from "react";
import { Loader } from "@/components/Loader";
import { useSubscriptionList } from "@/services/requests/subscriptionRequests";
import { useRoleList } from "@/services/requests/roleRequests";
import { useCurrentMemberStore } from "@/modules/member/useCurrentMemberStore";
import { MemberRoleDropdown } from "../member/others/MemberRoleDropdown";

const SubscriptionPage: React.FC = () => {
  const selectedRole = useCurrentMemberStore((state) => state.role);
  const { isLoading: roleListLoading } = useRoleList();

  const { isFetching: loading } = useSubscriptionList(Number(selectedRole.id));

  return (
    <>
      {roleListLoading ? (
        <Loader />
      ) : (
        <div className="px-10 py-10 overflow-visible  sm:px-6 sm:py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
              <div>
                <h1 className="text-4xl font-semibold text-gray-850">
                  Subscriptions
                </h1>
                <p className="text-lg font-semibold text-gray-500">
                  List of all subscriptions in a tabulated view. If not data
                  found, please change role.
                </p>
              </div>

              <div className="flex space-x-4">
                <MemberRoleDropdown />
                <SubscriptionModal type="add" />
              </div>
            </div>
            {!loading ? <SubscriptionTable /> : <Loader />}
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionPage;
