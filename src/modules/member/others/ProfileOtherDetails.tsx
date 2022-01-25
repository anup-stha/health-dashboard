/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/24/22, 8:53 PM
 *
 *
 */

/*
 * Super Admin is sent here as props
 * To check whether the details are for super admin.
 * if it is for super admin. then the check determines
 * whether to show the modal or not.
 *
 * */

import { Member, MemberDetails, Role } from "@/types";
import React from "react";
import { WarningOctagon } from "phosphor-react";
import { Bookmark } from "react-feather";

interface IProfileOtherDetails {
  details: MemberDetails[] | "superadmin";
  selectedMember?: Member;
  selectedRole?: Role;
}

export const ProfileOtherDetails = ({
  details: otherDetails,
  selectedMember,
  selectedRole,
}: IProfileOtherDetails) => {
  return (
    <div className="self-stretch w-3/5 text-lg flex flex-col gap-6 font-medium text-gray-70 sm:w-full">
      <div className="bg-gray-50 p-6 rounded-lg flex flex-col space-y-4 overflow-y-scroll sidebar h-full bg-local">
        <p className="text-2xl font-semibold text-gray-900">Other Info</p>

        {otherDetails.length === 0 || otherDetails === "superadmin" ? (
          <>
            <div className="flex items-center text-xl font-semibold text-red-400 space-x-2 ">
              <WarningOctagon size={24} /> <span>No Details Found</span>
              {/*  {otherDetails !== "superadmin" && (
                <MemberDetailAddModal
                  otherDetails={otherDetails}
                  memberData={selectedMember}
                  selectedRole={selectedRole}
                >
                  <span className={"text-gray-600 cursor-pointer underline"}>
                    Please add details
                  </span>
                </MemberDetailAddModal>
              )} */}
            </div>
          </>
        ) : (
          otherDetails.map((details) => (
            <div className="flex items-center gap-x-2 " key={details.id}>
              <div className="text-gray-800">
                <Bookmark />
              </div>

              <div className="space-x-2 line-clamp-1">
                <span>{details.name}:</span>
                {details.value &&
                details.value.toString().includes("https://") ? (
                  <a
                    href={String(details.value)}
                    className="font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {details.value}
                  </a>
                ) : (
                  <span className="font-semibold">{details.value}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
