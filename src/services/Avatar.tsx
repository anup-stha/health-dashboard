/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/3/22, 11:33 AM
 *
 *
 */

import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { alert } from "@/components/Alert";
import { logoutUser } from "@/services/requests";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import AvatarImage from "@/styles/avatar.svg";
import { CaretDown } from "phosphor-react";

export const ImageAvatar: React.FC = () => {
  const { push } = useRouter();
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
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 object-contain  relative">
                <Image
                  src={AvatarImage}
                  layout="fill"
                  className="absolute"
                  alt="Avatar"
                  objectFit="contain"
                  priority={true}
                />
              </div>
              <div
                className={`flex ${open ? "text-gray-900" : "text-gray-600"}`}
              >
                <span className="text-xl font-semibold">
                  Hi, {user.name ? user.name.split(" ")[0] : ""}
                </span>
                <CaretDown size={22} />
              </div>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1"
            >
              <Popover.Panel className="absolute z-10 p-2 mt-6 -right-1 bg-white ring-1 ring-black ring-opacity-5 rounded-sm shadow-lg space-y-2">
                <div className="overflow-hidden  ">
                  <a
                    onClick={() => {
                      push("/profile");
                    }}
                    className="bg-white flex items-center  transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70"
                  >
                    <div className="py-2 text-xl flex items-center  pl-4 pr-8  gap-2 text-gray-700  group-hover:text-white truncate">
                      <p className=" font-medium  ">View Profile</p>{" "}
                    </div>
                  </a>
                </div>
                <div className="overflow-hidden">
                  <a
                    onClick={() => onLogOut()}
                    className="bg-white flex items-center  transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70"
                  >
                    <div className="py-2 text-xl flex items-center  px-4 gap-2 text-gray-700  group-hover:text-white ">
                      <p className=" font-medium  ">Sign Out</p>{" "}
                    </div>
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover.Button>
        </>
      )}
    </Popover>
  );
};
