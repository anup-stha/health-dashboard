/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/23/22, 4:17 PM
 *
 *
 */

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { MemberProfileHeader } from "@/modules/members/components/profile/MemberProfileHeader";
import { DeviceHistoryTab } from "@/modules/members/components/tabs/DeviceHistoryTab";
import { MembersListTab } from "@/modules/members/components/tabs/MemberListTab";
import { PatientMedicalHistory } from "@/modules/members/components/tabs/PatientMedicalHistoryTab";
import { ProfileOverviewTab } from "@/modules/members/components/tabs/ProfileOverviewTab";
import { TestTab } from "@/modules/members/components/tabs/ProfileTestTab";
import { SubscriptionTab } from "@/modules/members/components/tabs/SubscriptionTab";
import { Member, MemberProfileTabs } from "@/modules/members/types";
import { getTabItemsForRole } from "@/modules/members/utils/getTabItemsForRole";

import { Role } from "@/types";

interface MemberProfilePage {
  member: Member;
  role: Role;
}

/**
 *
 * @constructor
 */
export function MemberProfilePage({ member, role }: MemberProfilePage) {
  const [selectedTab, setSelectedTab] = useState<MemberProfileTabs>("overview");
  const [tabList] = useState<MemberProfileTabs[]>(getTabItemsForRole(role.slug));

  return (
    <div className="px-10 py-8 md:px-4 w-full flex flex-col gap-8">
      <div className="w-full bg-white rounded-2xl shadow-sm p-8 pb-0 flex flex-col gap-14 md:gap-6">
        <MemberProfileHeader member={member} role={role} />
        <nav className="flex md:mt-8 gap-14 overflow-x-scroll sidebar">
          {tabList.map((tab) => (
            <div
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`text-[1.3rem] cursor-pointer ${
                tab === selectedTab ? "text-primary-500 font-medium" : "text-primary_gray-400 font-medium"
              }  pb-6 capitalize relative`}
            >
              {tab}
              {tab === selectedTab ? (
                <motion.div
                  transition={{ duration: 0.1 }}
                  layoutId="underline"
                  className="h-1 w-full absolute right-0 bottom-0 bg-primary-500"
                />
              ) : null}
            </div>
          ))}
        </nav>
      </div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={selectedTab ?? "empty"}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.1 }}
        >
          {selectedTab === "overview" ? (
            <ProfileOverviewTab primary_details={member} other_details={member.details} />
          ) : selectedTab === "members" ? (
            <MembersListTab parent_member_id={member.id} />
          ) : selectedTab === "devices" ? (
            <DeviceHistoryTab member_id={member.id} />
          ) : selectedTab === "tests" ? (
            <TestTab selectedMember={member} />
          ) : selectedTab === "medical history" ? (
            <PatientMedicalHistory selectedMember={member} />
          ) : selectedTab === "subscriptions" ? (
            <SubscriptionTab member_id={member.member_id ?? member.id} role_id={member.role.id} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
