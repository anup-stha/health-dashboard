/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/6/22, 7:08 PM
 *
 *
 */

import { BooleanTag } from "@/components/others/BooleanTag";
import { Bookmark, Calendar, Mail, Map, PhoneCall, User } from "react-feather";
import React from "react";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { GenderNeuter, WarningOctagon } from "phosphor-react";
import moment from "moment";
import { ProfileDataDetail } from "@/modules/members/others/MemberProfileDataDetail";
import { Member, MemberDetails, Role } from "@/types";
import { MemberDetailAddModal } from "../modal/MemberDetailAddModal";
import LetteredAvatar from "react-avatar";

type MemberDetailsProps = {
  active: boolean;
  verified: boolean;
  selectedRole: Role;
  selectedMember: Member;
};

export const ProfileAllDetails: React.FC<MemberDetailsProps> = ({
  active,
  verified,
  selectedRole,
  selectedMember,
}) => {
  const otherDetails = useMemberStore((state) => state.selectedMemberDetails);

  return (
    <div className="print:hidden relative w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 overflow-hidden">
      <div className="relative w-full h-52 z-0 profile" />

      <div className="absolute left-[3%] top-40 z-0 flex items-center gap-x-6">
        <div className="ring-4 ring-white rounded-full">
          <LetteredAvatar
            name={selectedMember.name}
            size="120"
            round={true}
            maxInitials={2}
          />
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="capitalize text-gray-900 font-semibold text-3xl tracking-wider sm:text-3xl">
            {selectedMember?.name}
          </h1>
          <p className="text-gray-500 font-semibold text-xl sm:text-lg">
            {selectedRole?.name}
          </p>
        </div>
      </div>
      {selectedMember && (
        <div className="min-h-[10rem] p-4">
          <div className="ml-[20%] flex justify-between items-center sm:items-start sm:ml-0 sm:mt-6 sm:-mb-16">
            <div className="sm:hidden" />
            <div className="flex items-center gap-2 sm:mt-24 text-lg ">
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
                  selectedMember.can_login ? "Can Login" : "Cannot Login"
                }
              />
            </div>
          </div>
          <div className="mt-20 font-medium text-gray-700 flex gap-x-6 sm:flex-col sm:gap-y-4 items-stretch">
            <div className="p-6 bg-gray-50 w-2/5 rounded-lg flex flex-col gap-4 sm:w-full ">
              <p className="text-2xl font-semibold text-gray-900">
                Personal Info
              </p>
              {selectedMember && (
                <>
                  <ProfileDataDetail
                    icon={<User />}
                    detail={selectedMember.member_code}
                  />
                  <ProfileDataDetail
                    icon={<Mail />}
                    detail={selectedMember.email}
                  />
                  <ProfileDataDetail
                    icon={<Map />}
                    detail={selectedMember.address}
                  />
                  <ProfileDataDetail
                    icon={<PhoneCall />}
                    detail={selectedMember.phone}
                  />
                  <ProfileDataDetail
                    icon={<Calendar />}
                    detail={dateConvert(selectedMember.dob_ad)}
                  />
                  <ProfileDataDetail
                    icon={<GenderNeuter size={24} weight={"bold"} />}
                    detail={selectedMember.gender}
                  />
                </>
              )}
            </div>
            <ProfileOtherDetails
              details={otherDetails}
              selectedMember={selectedMember}
              selectedRole={selectedRole}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const dateConvert = (epochInSec: number) =>
  moment(epochInSec * 1000).format("MMMM Do YYYY");

/*
 * Super Admin is sent here as props
 * To check whether the details are for superadmin.
 * if it is for superadmin. then the check determines
 * whether to show the modal or not.
 * */

type profileOtherDetailsType = {
  details: MemberDetails[] | "superadmin";
  selectedMember: Member;
  selectedRole: Role;
};

export const ProfileOtherDetails: React.FC<profileOtherDetailsType> = ({
  details: otherDetails,
  selectedMember,
  selectedRole,
}) => {
  return (
    <div className="self-stretch w-3/5 text-lg flex flex-col gap-6 font-medium text-gray-70 sm:w-full">
      <div className="bg-gray-50 p-6 rounded-lg flex flex-col space-y-4 overflow-y-scroll sidebar h-full bg-local">
        <p className="text-2xl font-semibold text-gray-900">Other Info</p>

        {otherDetails.length === 0 || otherDetails === "superadmin" ? (
          <>
            <div className="flex items-center text-xl font-semibold text-red-400 space-x-2 ">
              <WarningOctagon size={24} /> <span>No Details Found</span>
              {otherDetails !== "superadmin" && (
                <MemberDetailAddModal
                  otherDetails={otherDetails}
                  memberData={selectedMember}
                  selectedRole={selectedRole}
                >
                  <span className={"text-gray-600 cursor-pointer underline"}>
                    Please add details
                  </span>
                </MemberDetailAddModal>
              )}
            </div>
          </>
        ) : (
          otherDetails.map((details) => (
            <div className="flex items-center gap-x-2" key={details.id}>
              <div className="text-gray-800">
                <Bookmark />
              </div>

              <div className="space-x-2">
                <span>{details.name}:</span>
                <span className="font-semibold">{details.value}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
