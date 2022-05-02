/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import React from "react";

import { Heading } from "@/components/Headings";
import { Loader } from "@/components/Loader";

import { MemberRoleDropdown } from "@/modules/members/components/dropdown/MemberRoleDropdown";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { useRoleList } from "@/services/requests/roleRequests";
import { useSubscriptionList } from "@/services/requests/subscriptionRequests";

import { SubscriptionModal } from "./subscriptionModal";
import { SubscriptionTable } from "./subscriptionTable";

const SubscriptionPage: React.FC = () => {
  const selectedRole = useCurrentMemberStore((state) => state.role);
  const { isLoading: roleListLoading } = useRoleList();

  const { isFetching: loading } = useSubscriptionList(Number(selectedRole.id));

  return (
    <>
      {roleListLoading ? (
        <Loader />
      ) : (
        <div className="px-10 py-10 overflow-visible h-full sm:px-6 sm:py-6">
          <div className="flex flex-col space-y-6 h-full">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
              <Heading
                title="Subscriptions"
                subtitle="List of all subscriptions in a tabulated view. If not data found, please change role."
              />

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
