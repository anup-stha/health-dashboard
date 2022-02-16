/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/16/22, 11:29 PM
 *
 *
 */

import React, { useState } from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import Image from "next/image";
import LetteredAvatar from "react-avatar";
import {
  Camera,
  CircleWavyCheck,
  CircleWavyWarning,
  Envelope,
} from "phosphor-react";
import { Location, ProfileCircle } from "iconsax-react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileOverviewTab } from "@/modules/member";
import { PatientMedicalHistory } from "@/modules/member/others/PatientMedicalHistory";
import { SubscriptionTab } from "@/modules/member/new/SubscriptionTab";
import { getTabItemsForRole } from "@/modules/member/utils/getTabItemsForRole";
import { TabItemsType } from "../member/profile/MemberProfile";
import { ProfileImageModal } from "@/modules/profile/modal/ProfileImageModal";
import { useDashboardQuery } from "@/modules/dashboard/hooks/useDashboardQuery";

export const ProfilePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedTab, setSelectedTab] = useState<TabItemsType>("overview");
  const [tabList] = useState<TabItemsType[]>(
    getTabItemsForRole(user.role ? user.role.slug : "superadmin")
  );

  /*   const {  isLoading } = useRoleDetails(user.role.id); */

  /*   const onLogOut = async () => {
      await alert({
        promise: logoutUser(),
        msgs: {
          loading: "Logging Out",
          success: "Logged Out Successfully",
        },
        id: "Login Toast",
      });
    }; */
  const isLoading = false;
  /*
    if (isLoading) return <Loader />;
  */
  const { data } = useDashboardQuery();

  return (
    !isLoading && (
      <>
        <div className="px-10 py-8 md:px-4 w-full flex flex-col gap-8">
          <div className="w-full bg-white rounded-2xl shadow-sm p-8 pb-0 flex flex-col gap-14 md:gap-6">
            <div className="flex md:flex-col justify-between md:gap-8">
              <div className="flex gap-8 flex gap-8 sm:flex-col">
                <ProfileImageModal selectedMember={user}>
                  <div className="flex-shrink-0 h-56 w-56 cursor-pointer relative rounded-xl">
                    {user.image ? (
                      <Image
                        src={user.image}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl shadow-sm"
                        alt="profile image"
                      />
                    ) : (
                      <LetteredAvatar
                        name={user.name}
                        size="100%"
                        className="rounded-xl overflow-hidden"
                        maxInitials={2}
                      />
                    )}
                    <div
                      className={`w-6 h-6 shadow-xl ${
                        user.active ? "bg-green-500" : "bg-red-500"
                      } ring-[3px] ring-white rounded-full absolute z-20 inset-y-1/2 -right-3`}
                    />
                    <div className="bg-white flex items-center justify-center rounded-full text-gray-850 w-10 h-10 text-3xl absolute -right-4 -top-4">
                      <Camera weight={"duotone"} />
                    </div>
                  </div>
                </ProfileImageModal>

                <div className="py-1.5 flex flex-col justify-between md:gap-4 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-2 md:gap-1">
                      <div className="flex items-center  gap-2">
                        <h1 className="text-3xl font-bold text-gray-900 line-clamp-1">
                          {user.name}
                        </h1>
                        {user.verified ? (
                          <CircleWavyCheck
                            size={24}
                            weight="duotone"
                            className={"text-green-600"}
                          />
                        ) : (
                          <CircleWavyWarning
                            size={24}
                            weight="duotone"
                            className={"text-red-600"}
                          />
                        )}
                      </div>

                      <div className="flex md:flex-col md:gap-0 gap-4">
                        <div className="flex items-start space-x-1">
                          <ProfileCircle
                            size={18}
                            variant="Bulk"
                            color={"rgb(163 163 163)"}
                          />
                          <span
                            className={"text-gray-400 font-semibold text-lg"}
                          >
                            {user.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Location
                            size={18}
                            variant="Bulk"
                            color={"rgb(163 163 163)"}
                          />
                          <span
                            className={"text-gray-400 font-semibold text-lg"}
                          >
                            {user.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Envelope
                            size={18}
                            weight="duotone"
                            color={"rgb(163 163 163)"}
                          />
                          <span
                            className={"text-gray-400 font-semibold text-lg"}
                          >
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-start grid grid-cols-3 md:grid-cols-2 gap-4">
                    <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-gray-300 flex flex-col">
                      <span className="font-Inter text-2xl font-bold text-gray-900">
                        {data?.total_members ?? 0}
                      </span>
                      <span className="text-lg font-semibold text-gray-500">
                        Total Members
                      </span>
                    </div>
                    <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-gray-300 flex flex-col">
                      <span className="font-Inter text-2xl font-bold text-gray-900">
                        {data?.total_patient ?? 0}
                      </span>
                      <span className="text-lg font-semibold text-gray-500">
                        Total Patients
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 self-start flex space-x-4 relative">
                {/*   <ProfileUpdateModal user={user} />
                {!isLoading && data && user.id !== 1 && (
                  <MemberOtherDetailModal
                    otherDetails={user.details}
                    memberData={user}
                    selectedRole={data?.data?.data}
                  >
                    <Button color="bg-gray-500" buttonSize="small">
                      Edit Other Details
                    </Button>
                  </MemberOtherDetailModal>
                )} */}
              </div>
            </div>
            <nav className="flex md:mt-8 gap-14 overflow-x-scroll sidebar">
              {tabList.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`text-[1.3rem] cursor-pointer ${
                    tab === selectedTab
                      ? "text-green-500 font-semibold"
                      : "text-gray-400 font-semibold"
                  }  pb-6 capitalize relative`}
                >
                  {tab}
                  {tab === selectedTab ? (
                    <motion.div
                      transition={{ duration: 0.1 }}
                      layoutId="underline"
                      className={
                        "h-1 w-full absolute right-0 bottom-0 bg-green-500"
                      }
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
                <ProfileOverviewTab
                  primary_details={user}
                  other_details={user.details}
                />
              ) : selectedTab === "medical history" ? (
                <PatientMedicalHistory selectedMember={user} />
              ) : selectedTab === "subscriptions" ? (
                <SubscriptionTab
                  member_id={Number(user.member_id)}
                  role_id={user.role ? user.role.id : 0}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
          ;
        </div>
      </>
    )
  );
};
