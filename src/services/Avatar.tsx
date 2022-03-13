/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/5/22, 8:08 PM
 *
 *
 */

import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import React, { Fragment } from "react";
import LetteredAvatar from "react-avatar";

import { alert } from "@/components/Alert";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { logoutUser } from "@/services/requests";

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
    <Menu as="div" className="relative">
      <Menu.Button>
        <div className="flex items-center space-x-2">
          {user.image ? (
            <div className="w-10 h-10 bg-white rounded-full relative overflow-hidden">
              <Image src={user.image} layout="fill" alt="Avatar" objectFit="cover" />
            </div>
          ) : (
            <LetteredAvatar name={user.name} size="30" round={true} maxInitials={2} />
          )}

          <div className="flex text-primary_gray-900">
            <span className="text-xl font-medium">Hi, {user.name ? user.name.split(" ")[0] : ""}</span>
            <CaretDown size={22} />
          </div>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-12 right-0 mt-2 w-64 origin-top-right divide-y divide-primary_gray-100 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item as="div">
            {({ active: btnActive }) => (
              <button
                onClick={() => push("/profile")}
                className={`${
                  btnActive ? `bg-neutral-100 text-neutral-800 text-white` : "text-primary_gray-700"
                } group flex w-full items-center rounded-md px-4 py-3 text-xl font-medium`}
              >
                View Profile
              </button>
            )}
          </Menu.Item>
          <Menu.Item as="div">
            {({ active: btnActive }) => (
              <button
                onClick={onLogOut}
                className={`${
                  btnActive ? `bg-neutral-100 text-neutral-800 text-white` : "text-primary_gray-700"
                } group flex w-full items-center  rounded-md px-4 py-3 text-xl font-medium`}
              >
                Log out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
