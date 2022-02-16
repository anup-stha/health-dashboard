/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 10:41 AM
 *
 *
 */

import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import React, { Fragment, useState } from "react";
import { getTabItemsForRole } from "@/modules/member/utils/getTabItemsForRole";
import Image from "next/image";
import { Location, ProfileCircle } from "iconsax-react";
import {
  CircleWavyCheck,
  CircleWavyWarning,
  DotsThreeOutline,
  Envelope,
} from "phosphor-react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileOverviewTab } from "@/modules/member";
import { MembersTab } from "@/modules/member/new/MembersTab";
import { DeviceHistory } from "@/modules/member/device_history";
import LetteredAvatar from "react-avatar";
import { ProfileTestSection } from "@/modules/member/others/ProfileTestSection";
import { PatientMedicalHistory } from "@/modules/member/others/PatientMedicalHistory";
import { Button } from "@/components/Button";
import { Menu, Transition } from "@headlessui/react";
import { MemberToggle } from "@/modules/member/others/MemberToggle";

type TabItemsType =
  | "overview"
  | "members"
  | "subscriptions"
  | "billing"
  | "tests"
  | "devices"
  | "settings"
  | "medical history";

const MemberProfile = () => {
  const selectedMember = useCurrentMemberStore((state) => state.member);
  const selectedRole = useCurrentMemberStore((state) => state.role);
  const [active, setActive] = useState(selectedMember.active);
  const [verified, setVerified] = useState(selectedMember.verified);
  /*
    const user = useAuthStore((state) => state.user);
  */

  const [selectedTab, setSelectedTab] = useState<TabItemsType>("overview");
  const [tabList] = useState<TabItemsType[]>(
    getTabItemsForRole(selectedRole.slug)
  );

  /*   const { isFetching } = useMemberSubsDetails(
      user.id !== 1 ? 0 : selectedMember.id
    );
    const { isFetching: subsLoading } = useSubscriptionList(
      user.id! !== 1 ? 0 : Number(selectedRole.id)
    ); */

  return (
    <div className="px-10 py-8 w-full flex flex-col gap-8">
      <div className="w-full bg-white rounded-2xl shadow-sm p-8 pb-0 flex flex-col gap-14">
        <div className="flex space-x-8">
          <div className="flex-shrink-0 h-56 w-56 relative rounded-xl">
            {selectedMember.image ? (
              <Image
                src={selectedMember.image}
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-sm"
                alt="profile image"
              />
            ) : (
              <LetteredAvatar
                name={selectedMember.name}
                size="100%"
                maxInitials={2}
              />
            )}
            <div
              className={`w-6 h-6 shadow-xl ${
                active ? "bg-green-500" : "bg-red-500"
              } ring-[3px] ring-white rounded-full absolute z-20 inset-y-1/2 -right-3`}
            />
          </div>
          <div className="py-1.5 flex flex-col justify-between w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col space-y-2">
                <div className="flex gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {selectedMember.name}
                  </h1>
                  {verified ? (
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

                <div className="flex gap-4">
                  <div className="flex items-start space-x-1">
                    <ProfileCircle
                      size={18}
                      variant="Bulk"
                      color={"rgb(163 163 163)"}
                    />
                    <span className={"text-gray-400 font-semibold text-lg"}>
                      {selectedRole.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Location
                      size={18}
                      variant="Bulk"
                      color={"rgb(163 163 163)"}
                    />
                    <span className={"text-gray-400 font-semibold text-lg"}>
                      {selectedMember.address}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Envelope
                      size={18}
                      weight="duotone"
                      color={"rgb(163 163 163)"}
                    />
                    <span className={"text-gray-400 font-semibold text-lg"}>
                      {selectedMember.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-start grid grid-cols-3 gap-4">
              <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-gray-300 flex flex-col">
                <span className="font-Inter text-2xl font-bold text-gray-900">
                  10
                </span>
                <span className="text-lg font-semibold text-gray-500">
                  Total Operators
                </span>
              </div>
              <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-gray-300 flex flex-col">
                <span className="font-Inter text-2xl font-bold text-gray-900">
                  110
                </span>
                <span className="text-lg font-semibold text-gray-500">
                  Total Patients
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 self-start flex space-x-4 relative">
            <Button buttonSize="small">Edit Profile</Button>
            <Menu>
              <Menu.Button>
                <button className=" py-3.5 px-4 text-xl text-green-600 rounded-lg bg-slate-200 hover:bg-gray-300">
                  <DotsThreeOutline weight="duotone" size={20} />
                </button>
              </Menu.Button>{" "}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute top-16 right-0 w-72 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-2">
                    <MemberToggle
                      toggle={"active"}
                      memberId={selectedMember.id}
                      currentState={active}
                      setCurrentState={setActive}
                      selectedMemberDetails={selectedMember}
                    />
                  </div>
                  <div className="p-2 ">
                    <MemberToggle
                      toggle={"verified"}
                      memberId={selectedMember.id}
                      currentState={verified}
                      setCurrentState={setVerified}
                      selectedMemberDetails={selectedMember}
                    />
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <nav className="flex gap-14">
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
      <div className="w-full bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-14 relative">
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
                primary_details={selectedMember}
                other_details={selectedMember.details}
              />
            ) : selectedTab === "members" ? (
              <MembersTab parent_member_id={selectedMember.id} />
            ) : selectedTab === "devices" ? (
              <DeviceHistory member_id={selectedMember.id} />
            ) : selectedTab === "tests" ? (
              <ProfileTestSection selectedMember={selectedMember} />
            ) : selectedTab === "medical history" ? (
              <PatientMedicalHistory selectedMember={selectedMember} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
      ;
    </div>
    /*  <div className="flex gap-8 p-10 lg:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-6">
       <div className="w-3/4 space-y-8 lg:w-full">
         <ProfileDetails selectedMember={selectedMember} />
         {selectedMember.role.slug === "patient" ? (
           <>
             <ProfileTestSection selectedMember={selectedMember} />
             <PatientMedicalHistory selectedMember={selectedMember} />
           </>
         ) : selectedMember.role.slug === "individual" ? (
           <ProfileTestSection selectedMember={selectedMember} />
         ) : selectedMember.role.slug === "org_admin" ? (
           <UsersTable parent_member_id={selectedMember.id} />
         ) : null}
         {selectedRole.permissions.find(
           (permission) => permission.slug === "login"
         ) && user.id === 1 ? (
           <DeviceHistory member_id={selectedMember.id} />
         ) : null}
       </div>
       <div className="w-1/4 lg:w-full h-auto lg:grid lg:grid-cols-2  flex flex-col sm:flex sm:flex-col gap-8 ">
         {selectedMember.role.slug === "patient" ||
         selectedMember.role.slug === "org_operator" ? null : subsLoading &&
           isFetching ? (
           <ProfileSubsLoadingState />
         ) : (
           <ProfileSubscription member_id={selectedMember.id} />
         )}
         {selectedMember.role.slug === "org_admin" ? (
           <InvoiceHistory member_id={selectedMember.id} />
         ) : null}
         <MemberProfileControls
           selectedRole={selectedRole}
           selectedMember={selectedMember}
         />
       </div>  </div> */
  );
};

export { MemberProfile };
