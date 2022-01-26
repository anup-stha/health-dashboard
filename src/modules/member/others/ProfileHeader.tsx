/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/26/22, 8:10 PM
 *
 *
 */

import React from "react";
import LetteredAvatar from "react-avatar";
import { Member } from "@/modules/member/types";
import Image from "next/image";
import { Camera } from "phosphor-react";
import { ProfileImageModal } from "@/modules/profile/modal/ProfileImageModal";
import { useRouter } from "next/router";

interface IProfileHeader {
  selectedMember: Member;
}

export const ProfileHeader = ({ selectedMember }: IProfileHeader) => {
  const router = useRouter();

  return (
    <div className="absolute left-[3%] top-40 z-0 flex items-center gap-x-6">
      {router.asPath.includes("profile") ? (
        <ProfileImageModal selectedMember={selectedMember}>
          <div className="relative">
            <div className=" cursor-pointer ring-4 ring-white rounded-full relative overflow-hidden">
              {selectedMember.image ? (
                <div className="w-40 h-40 bg-white relative overflow-hidden">
                  <Image
                    src={selectedMember.image}
                    layout="fill"
                    alt="Avatar"
                    objectFit="contain"
                  />
                </div>
              ) : (
                <div>
                  <LetteredAvatar
                    name={selectedMember.name}
                    size="120"
                    round={true}
                    maxInitials={2}
                  />
                </div>
              )}
            </div>
            <div className="bg-white flex items-center justify-center rounded-full text-gray-850 w-10 h-10 text-3xl absolute right-0 top-0">
              <Camera weight={"duotone"} />
            </div>
          </div>
        </ProfileImageModal>
      ) : (
        <div className="ring-4 ring-white rounded-full relative overflow-hidden">
          {selectedMember.image ? (
            <div className="w-40 h-40 bg-white relative overflow-hidden">
              <Image
                src={selectedMember.image}
                layout="fill"
                alt="Avatar"
                objectFit="contain"
              />
            </div>
          ) : (
            <div>
              <LetteredAvatar
                name={selectedMember.name}
                size="120"
                round={true}
                maxInitials={2}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col mt-10">
        <h1 className="capitalize text-gray-900 font-semibold text-3xl tracking-wider sm:text-3xl">
          {selectedMember?.name}
        </h1>
        <p className="text-gray-500 font-semibold text-xl sm:text-lg">
          {selectedMember.role.name}
        </p>
      </div>
    </div>
  );
};
