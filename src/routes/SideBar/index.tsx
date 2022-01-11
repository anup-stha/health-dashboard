/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/11/22, 5:29 PM
 *
 *
 */

import Image from "next/image";
import LetteredAvatar from "react-avatar";
import { useSideBarStore } from "./useSideBarStore";
import React from "react";
import { NavBar } from "./NavBar";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useGlobalState } from "@/modules/useGlobalState";

export const Sidebar: React.FC = () => {
  const open = useSideBarStore((state) => state.open);
  const user = useAuthStore((state) => state.user);
  const systemVersion = useGlobalState((state) => state.base.system_version);

  return (
    <nav
      className={`${
        open
          ? "w-[18%] px-4 py-4 sm:w-3/5 md:w-1/3 lg:w-1/4"
          : "w-24 px-4 sm:w-0 sm:p-0 "
      }  print:hidden transition-all duration-300 h-screen min-h-0 z-40 fixed shadow-E400 bg-white space-y-12 text-3xl flex flex-col justify-between `}
    >
      <div className="flex flex-col space-y-12">
        {open ? (
          <div className=" w-full bg-white shadow-E500 rounded-md p-4 flex items-center space-x-2">
            <LetteredAvatar
              name={user.name}
              size="50"
              round={true}
              maxInitials={2}
            />

            <div className="flex flex-col w-3/4">
              <span className="text-black font-semibold text-xl line-clamp-1">
                {user.name}
              </span>
              <span className="text-gray-500 font-semibold tracking-wider text-base ">
                {user.role && user.role.name}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 sm:hidden">
            <LetteredAvatar
              name={user.name}
              size="50"
              round={true}
              maxInitials={2}
            />
          </div>
        )}
        <NavBar />
      </div>
      {open && (
        <div className="w-full flex flex-col space-y-2">
          <div className="relative w-full h-64">
            <Image
              src={"/assets/sidebar-illustration.svg"}
              layout={"fill"}
              alt="Super User Illustration"
              objectFit={"cover"}
            />
          </div>

          <div>
            <div className="text-sm text-gray-700 font-bold text-center">
              &#169; Copyright by Sunya Health Pvt. Ltd.
            </div>{" "}
            <div className="text-sm text-gray-500 font-semibold  text-center">
              System Version: {systemVersion.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
