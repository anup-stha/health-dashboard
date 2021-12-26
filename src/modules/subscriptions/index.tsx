/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/26/21, 10:12 PM
 *
 *
 */

import { MemberRoleDropdown } from "../members/others/memberRoleDropDown";
import { SubscriptionModal } from "./subscriptionModal";
import { SubscriptionTable } from "./subscriptionTable";
import React from "react";
import { MainLayout } from "@/layout/MainLayout";

type SubscriptionPageProps = {
  loading: boolean;
};

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ loading }) => {
  return (
    <MainLayout>
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
          {!loading && <SubscriptionTable />}
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
