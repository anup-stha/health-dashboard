/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/31/21, 1:15 PM
 *
 *
 */

import Image from "next/image";
import { Calendar, Mail, Map, PhoneCall, Users } from "react-feather";
import { PasswordModal } from "./passwordModal";
import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { alert } from "@/components/Alert";
import { logoutUser } from "@/services/requests";
import { BooleanTag } from "@/components/others/BooleanTag";
import moment from "moment";
import { GenderNeuter } from "phosphor-react";
import { ProfileUpdateModal } from "@/modules/profile/modal/ProfileUpdateModal";
import { ProfileSubscription } from "@/modules/members/profile/ProfileSubscription";

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
      <div className="flex gap-8 p-10 sm:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-6">
        <div className="relative w-3/4 bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 overflow-hidden">
          <div className="relative w-full h-52 z-0 profile " />

          <div className="absolute left-[3%] top-40 z-0 flex items-center gap-x-6">
            <div className="relative w-40 h-40 z-10 ring-4 ring-white rounded-full">
              <Image
                src="/assets/memberAvatar.svg"
                layout="fill"
                objectFit="cover"
                className="z-40 rounded-full"
                alt="Profile Image"
              />
            </div>
            <div className="flex flex-col mt-10">
              <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
                {user.name}
              </h1>
              <p className="text-gray-500 font-semibold text-xl sm:text-lg">
                {user.role ? user.role.name : ""}
              </p>
            </div>
          </div>
          <div className="px-6 py-6 min-h-[10rem] sm:px-2">
            <div className="ml-[20%] flex justify-between items-center sm:items-start sm:ml-0 ">
              <div className="sm:hidden" />
              <div className="flex items-center gap-1 sm:mt-24 sm:ml-4">
                <BooleanTag
                  type="error"
                  condition={user.active}
                  trueStatement="Active"
                  falseStatement="InActive"
                />
                <BooleanTag
                  type="error"
                  condition={user.verified}
                  trueStatement="Verified"
                  falseStatement="Not Verified"
                />
              </div>
            </div>
            <div className="mt-20 font-medium text-gray-700 flex gap-x-6 sm:flex-col sm:gap-y-4">
              <div className="  p-6 bg-gray-50 w-2/5 text-xl rounded-lg flex flex-col gap-4 sm:w-full ">
                <p className="text-2xl font-semibold text-gray-900">Personal Info</p>
                <div className="flex gap-x-4">
                  <div className="text-gray-800">
                    <Mail />
                  </div>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <Map />
                  </div>
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <PhoneCall />
                  </div>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <Calendar />
                  </div>
                  <span>
                    Date of Birth: {moment(Number(user.dob_ad) * 1000).format("MMMM Do YYYY")}
                  </span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <Users />
                  </div>
                  <span>Marital Status: {user.marital_status}</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <GenderNeuter size={24} weight={"bold"} />
                  </div>
                  <span className="capitalize">Gender: {user.gender}</span>
                </div>
              </div>
              <div className="w-3/5 text-lg flex flex-col gap-6 font-medium text-gray-70 sm:w-full">
                <div className="bg-gray-50 h-1/2 p-6 rounded-lg flex flex-col justify-between">
                  <p className="text-2xl font-semibold text-gray-900">Short Summary</p>
                  <span>N/A</span>
                </div>

                <div className="bg-gray-50 h-1/2 p-4 rounded-lg flex sm:w-full">
                  <div className="flex flex-col justify-between w-3/4 p-2 ">
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-semibold text-gray-900">Activity</p>
                    </div>

                    <span>N/A</span>
                  </div>
                  <div className="w-1/4 border-l-2 border-gray-300 flex items-center justify-center">
                    <p className="text-green-500 text-xl font-bold cursor-pointer sm:whitespace-nowrap sm:pl-2">
                      See More
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-8 sm:w-full">
          <ProfileSubscription member_id={user.member_id} />

          <div className=" w-full h-auto bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 py-2 px-4 self-start">
            <ProfileUpdateModal />
            <PasswordModal />
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
