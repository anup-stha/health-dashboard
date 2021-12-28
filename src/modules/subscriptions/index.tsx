/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 3:31 PM
 *
 *
 */

import { MemberRoleDropdown } from "../members/others/memberRoleDropDown";
import { SubscriptionModal } from "./subscriptionModal";
import { SubscriptionTable } from "./subscriptionTable";
import React from "react";
import { MainLayout } from "@/layout/MainLayout";
import { Loader } from "@/components/Loader";
import { memberStore } from "@/modules/members/memberStore";
import { useSubscriptionList } from "@/services/requests/subscriptionRequests";
import { useRoleList } from "@/services/requests/roleRequests";

const SubscriptionPage: React.FC = () => {
  const { selectedRole } = memberStore();
  const { isLoading: roleListLoading } = useRoleList();

  const { isLoading: loading } = useSubscriptionList(Number(selectedRole.id));

  return (
    <MainLayout>
      {roleListLoading ? (
        <Loader />
      ) : (
        <div className="px-10 py-10 overflow-visible  sm:px-6 sm:py-8">
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
    </MainLayout>
  );
};

export default SubscriptionPage;
