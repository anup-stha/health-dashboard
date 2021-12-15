/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:38 AM
 *
 *
 */

import Image from "next/image";
import CoverImage from "../../../../public/assets/cover.png";
import { BooleanTag } from "@/components/others/BooleanTag";
import {
  Bookmark,
  Briefcase,
  Calendar,
  Mail,
  Map,
  PhoneCall,
} from "react-feather";
import React from "react";
import { Member, Role } from "@/types";
import { memberStore } from "@/modules/members/memberStore";
import { WarningOctagon } from "phosphor-react";
import { MemberDetailAddModal } from "@/modules/members/profile/memberDetailAddModal";

type MemberProfileDataProps = {
  selectedMemberDetails: Member;
  role: Role;
  active: boolean;
  verified: boolean;
};

export const MemberProfileData: React.FC<MemberProfileDataProps> = ({
  selectedMemberDetails,
  active,
  role,
  verified,
}) => {
  const { selectedMemberDetails: otherDetails } = memberStore();

  return (
    <div className="relative w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
      <div className="relative w-full h-52 z-0">
        <Image
          src={CoverImage}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 35%"
          className="rounded-t-xl z-40"
          placeholder="blur"
          alt="Cover Image"
        />
      </div>

      <div className="absolute left-[3%] top-40 z-0 flex items-center gap-x-6">
        <div className="relative w-40 h-40 z-10 ring-4 ring-white rounded-full">
          <Image
            src="/assets/profile.jpg"
            layout="fill"
            objectFit="cover"
            className="z-40 rounded-full"
            alt="Profile Image"
          />
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
            {selectedMemberDetails.name}
          </h1>
          <p className="text-gray-500 font-semibold text-xl sm:text-lg">
            {role.name}
          </p>
        </div>
      </div>
      <div className="px-6 py-6 min-h-[10rem] sm:px-2">
        <div className="ml-[20%] flex justify-between items-center sm:items-start sm:ml-0 ">
          <div className="sm:hidden" />
          <div className="flex items-center gap-2 sm:mt-24 sm:ml-4 text-lg">
            <BooleanTag
              type="error"
              condition={active}
              trueStatement="Active"
              falseStatement="InActive"
            />
            <BooleanTag
              type="error"
              condition={verified}
              trueStatement="Verified"
              falseStatement="Not Verified"
            />

            <BooleanTag
              type="info"
              trueStatement={
                selectedMemberDetails.can_login ? "Can Login" : "Cannot Login"
              }
            />
          </div>
        </div>
        <div className="mt-20 font-medium text-gray-700 flex gap-x-6 sm:flex-col sm:gap-y-4 h-[30vh] items-stretch">
          <div className="p-6 bg-gray-50 w-2/5 text-xl rounded-lg flex flex-col gap-4 sm:w-full ">
            <p className="text-2xl font-semibold text-gray-900">
              Personal Info
            </p>
            <div className="flex items-center gap-x-4">
              <div className="text-gray-800">
                <Briefcase />
              </div>
              <span>Sunya Health</span>
            </div>
            <div className="flex gap-x-4">
              <div className="text-gray-800">
                <Mail />
              </div>
              <span>{selectedMemberDetails.email}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="text-gray-800">
                <Map />
              </div>
              <span>{selectedMemberDetails.address}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="text-gray-800">
                <PhoneCall />
              </div>
              <span>{selectedMemberDetails.phone}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="text-gray-800">
                <Calendar />
              </div>
              <span>Date joined: 2021/11/25</span>
            </div>
          </div>
          <div className="w-3/5 text-lg flex flex-col gap-6 font-medium text-gray-70 sm:w-full overflow-y-scroll sidebar h-full">
            <div className="bg-gray-50 p-6 rounded-lg flex flex-col space-y-4 h-full">
              <p className="text-2xl font-semibold text-gray-900">Other Info</p>

              {otherDetails.length === 0 ? (
                <>
                  <div className="flex items-center text-xl font-semibold text-red-400 space-x-2 ">
                    <WarningOctagon size={24} /> <span>No Details Found</span>
                    <MemberDetailAddModal memberData={selectedMemberDetails}>
                      <span
                        className={"text-gray-600 cursor-pointer underline"}
                      >
                        Please add details
                      </span>
                    </MemberDetailAddModal>
                  </div>
                </>
              ) : (
                otherDetails.map((details) => (
                  <div className="flex items-center gap-x-2" key={details.id}>
                    <div className="text-gray-800">
                      <Bookmark />
                    </div>

                    <div className=" space-x-2">
                      <span>{details.name}:</span>
                      <span className="font-semibold">{details.value}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
