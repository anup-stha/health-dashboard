/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { useRouter } from "next/router";
import React from "react";
import { isMobile } from "react-device-detect";

import { RouteObjectType } from "./routes";
import { useSideBarStore } from "./useSideBarStore";

type NavItemProps = {
  route: RouteObjectType;
  containerClassName?: string;
};

export const NavItem: React.FC<NavItemProps> = ({ route, containerClassName }) => {
  const { open, toggleOpen } = useSideBarStore();
  const { pathname, push } = useRouter();

  const activeStyles =
    "font-medium text-gray-900  bg-gray-100 relative py-2.5 rounded-lg cursor-pointer hover:bg-gray-200 ";
  const inactiveStyles =
    "font-medium text-gray-500 hover:text-gray-900 relative py-2.5 rounded-lg cursor-pointer hover:bg-gray-50   ";

  return (
    <div className={containerClassName}>
      <li
        className={route.link && pathname.includes(route.link) ? activeStyles : inactiveStyles}
        onClick={() => {
          route.link &&
            push(route.link).then(() => {
              isMobile && toggleOpen();
            });
        }}
      >
        <div className="peer flex">
          <div
            className={`flex relative items-start justify-start px-4  ${
              open ? "translate-x-0" : "-translate-x-96 w-0 p-0 "
            } transition-all duration-100 `}
          >
            <span className="flex items-center gap-x-4 text-lg">
              <div>{route.icon}</div>

              <span className="sm:text-lg line-clamp-1">{route.title}</span>
            </span>
          </div>

          <div
            className={`flex relative items-center sm:hidden ${
              !open ? "opacity-100 -translate-x-8 transition-opacity duration-500  px-4 " : "opacity-0 w-0 p-0"
            }  `}
          >
            <div className="sm:hidden">{route.icon}</div>
          </div>
        </div>

        {!open && (
          <div className="pointer-events-none text-gray-50 rounded-md shadow-E200 bg-gray-800 font-normal h-10 absolute top-0 translate-y-1/4 left-[150%] opacity-0 w-0 peer-hover:w-36 peer-hover:opacity-100 transition-all duration-300 z-0 text-lg flex items-center justify-center">
            {route.title}
          </div>
        )}
      </li>
    </div>
  );
};
