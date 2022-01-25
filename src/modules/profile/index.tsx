/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 9:21 PM
 *
 *
 */

import { PasswordModal } from "./passwordModal";
import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { alert } from "@/components/Alert";
import { logoutUser } from "@/services/requests";
import { ProfileUpdateModal } from "@/modules/profile/modal/ProfileUpdateModal";
/* import { useMemberDetails } from "@/modules/members/api/hooks/useMemberDetails";
import { ProfileOtherDetails } from "@/modules/members/profile/ProfileAllDetails";
import { MemberDetailAddModal } from "@/modules/members/modal/MemberDetailAddModal"; */
import { ProfileSubscription } from "@/modules/member/others/ProfileSubscription";
import { ProfileDetails } from "@/modules/member/others/ProfileDetails";

export const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  const onLogOut = async () => {
    await alert({
      promise: logoutUser(),
      msgs: {
        loading: "Logging Out",
        success: "Logged Out Successfully",
      },
      id: "Login Toast",
    });
  };

  return (
    <>
      <div className="flex gap-8 p-10 items-start sm:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-6">
        <div className="relative w-3/4 bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 overflow-hidden">
          {Object.keys(user).length !== 0 && (
            <ProfileDetails selectedMember={user} />
          )}
        </div>
        <div className="w-1/4 flex flex-col gap-8 sm:w-full">
          {user.id !== 1 && <ProfileSubscription member_id={user.id} />}

          <div className=" w-full h-auto bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 py-2 px-4 self-start">
            <ProfileUpdateModal />
            <PasswordModal />
            {/*  {roleDetails?.data.data && (
              <MemberDetailAddModal
                otherDetails={data?.data.data ?? []}
                memberData={user}
                selectedRole={roleDetails?.data.data}
              />
            )} */}

            <hr className={" border-t-2 border-gray-200 "} />
            <div
              onClick={() => onLogOut()}
              className="p-6  text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850"
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
