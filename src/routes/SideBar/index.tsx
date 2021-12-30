/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 10:56 AM
 *
 *
 */

import Image from "next/image";
import Avatar from "@/styles/avatar.svg";
import SuperUserIlustration from "@/styles/superuser-illustration.svg";
import { useSideBarStore } from "./useSideBarStore";
import React from "react";
import { NavBar } from "./NavBar";
import { useAuthStore } from "@/modules/auth/useTokenStore";

export const Sidebar: React.FC = () => {
  const { open } = useSideBarStore();
  const { user } = useAuthStore();
  return (
    <nav
      className={`${
        open
          ? "w-[18%] px-4 py-4 sm:w-3/5 md:w-1/3 lg:w-1/4"
          : "w-24 px-4 sm:w-0 sm:p-0 "
      }  print:hidden transition-all duration-300 h-screen min-h-0 z-30 fixed shadow-E400 bg-white space-y-12 sidebar text-3xl flex flex-col justify-between `}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        minHeight: "-webkit-fill-available",
      }}
    >
      <div className="flex flex-col space-y-12">
        {open ? (
          <div className=" w-full bg-white shadow-E500 rounded-md p-4 flex items-center space-x-2">
            <div className="w-16 h-16 object-contain  relative">
              <Image
                src={Avatar}
                layout="fill"
                className="absolute"
                objectFit="contain"
                alt="Error"
                priority={true}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-black font-semibold text-xl overflow-hidden truncate">
                {user.name}
              </span>
              <span className="text-gray-500 font-semibold tracking-wider text-base ">
                {user.role && user.role.name}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 sm:hidden">
            <div className="w-16 h-16 object-contain  relative">
              <Image
                src={Avatar}
                layout="fill"
                className="absolute"
                objectFit="contain"
                alt="Avatar"
                priority={true}
              />
            </div>
          </div>
        )}
        <NavBar />
      </div>
      {open && (
        <div className="w-full flex flex-col space-y-4">
          <div className="p-1">
            <Image src={SuperUserIlustration} alt="Super User Illustration" />
          </div>

          <div className="text-sm text-gray-700 font-bold text-center">
            &#169; Copyright by Sunya Health Pvt. Ltd.
          </div>
        </div>
      )}
    </nav>
  );
};
