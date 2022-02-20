/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 1:50 PM
 *
 *
 */

import { Menu, Transition } from "@headlessui/react";
import { Location, ProfileCircle } from "iconsax-react";
import Image from "next/image";
import {
  CircleWavyCheck,
  CircleWavyWarning,
  DotsThreeOutline,
  Envelope,
} from "phosphor-react";
import React, { Fragment, useState } from "react";
import LetteredAvatar from "react-avatar";

import { Button } from "@/components/Button";

import { MemberModal } from "@/modules/members/components/modal/MemberModal";
import { MemberOtherDetailModal } from "@/modules/members/components/modal/MemberOtherDetailModal";
import { MemberToggle } from "@/modules/members/components/profile/MemberToggle";
import { useGetOverviewData } from "@/modules/members/hooks/query/useGetOverviewData";
import { Member } from "@/modules/members/types";

import { Role } from "@/types";

interface IMemberProfileHeaderProps {
  member: Member;
  role: Role;
}

/**
 *
 * @param {Member} member - selected Member
 * @param {Member} role - selected Role
 * @return {JSX.Element}
 */
export function MemberProfileHeader({
  member,
  role,
}: IMemberProfileHeaderProps) {
  const [active, setActive] = useState(member.active);
  const [verified, setVerified] = useState(member.verified);
  const { data } = useGetOverviewData(member.id);

  return (
    <div className="flex md:flex-col justify-between md:gap-8">
      <div className="flex gap-8 sm:flex-col">
        <div className="flex-shrink-0 h-56 w-56  relative rounded-xl">
          {member.image ? (
            <Image
              src={member.image}
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-sm"
              alt="profile image"
            />
          ) : (
            <LetteredAvatar
              name={member.name}
              size="100%"
              className="rounded-xl overflow-hidden"
              maxInitials={2}
            />
          )}
          <div
            className={`w-6 h-6 shadow-xl ${
              active ? "bg-green-500" : "bg-red-500"
            } ring-[3px] ring-white rounded-full absolute z-20 inset-y-1/2 -right-3`}
          />
        </div>
        <div className="py-1.5 flex flex-col justify-between md:gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2 md:gap-1">
              <div className="flex items-center  gap-2">
                <h1 className="text-3xl font-bold text-gray-900 line-clamp-1">
                  {member.name}
                </h1>
                {verified ? (
                  <CircleWavyCheck
                    size={24}
                    weight="duotone"
                    className="text-green-600"
                  />
                ) : (
                  <CircleWavyWarning
                    size={24}
                    weight="duotone"
                    className="text-red-600"
                  />
                )}
              </div>

              <div className="flex md:flex-col md:gap-0 gap-4">
                <div className="flex items-start space-x-1">
                  <ProfileCircle
                    size={18}
                    variant="Bulk"
                    color="rgb(163 163 163)"
                  />
                  <span className="text-gray-400 font-semibold text-lg">
                    {role.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Location size={18} variant="Bulk" color="rgb(163 163 163)" />
                  <span className="text-gray-400 font-semibold text-lg">
                    {member.address}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Envelope
                    size={18}
                    weight="duotone"
                    color="rgb(163 163 163)"
                  />
                  <span className="text-gray-400 font-semibold text-lg">
                    {member.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="self-start grid grid-cols-3 md:grid-cols-2 gap-4">
            <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-gray-300 flex flex-col">
              <span className="font-Inter text-2xl font-bold text-gray-900">
                {data?.organization_operator ?? 0}
              </span>
              <span className="text-lg font-semibold text-gray-500">
                Total Operators
              </span>
            </div>
            <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-gray-300 flex flex-col">
              <span className="font-Inter text-2xl font-bold text-gray-900">
                {data?.total_members ?? 0}
              </span>
              <span className="text-lg font-semibold text-gray-500">
                Total Members
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 self-start flex space-x-4 relative">
        <MemberOtherDetailModal
          otherDetails={member.details}
          memberData={member}
          selectedRole={role}
        >
          <Button color="bg-gray-500" buttonSize="small">
            Edit Other Details
          </Button>
        </MemberOtherDetailModal>
        <MemberModal
          type="edit"
          selectedRole={role}
          initialData={member}
          button={<Button buttonSize="small">Edit Profile</Button>}
        />

        <Menu className="z-20" as="div">
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
                  toggle="active"
                  memberId={member.id}
                  currentState={active}
                  setCurrentState={setActive}
                  selectedMemberDetails={member}
                />
              </div>
              <div className="p-2 ">
                <MemberToggle
                  toggle="verified"
                  memberId={member.id}
                  currentState={verified}
                  setCurrentState={setVerified}
                  selectedMemberDetails={member}
                />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
