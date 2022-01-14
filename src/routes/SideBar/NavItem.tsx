/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 3:07 PM
 *
 *
 */

import { useRouter } from "next/router";
import { RouteObjectType } from "./routes";
import { useSideBarStore } from "./useSideBarStore";
import { isMobile } from "react-device-detect";

type NavItemProps = {
  route: RouteObjectType;
  containerClassName?: string;
};

export const NavItem: React.FC<NavItemProps> = ({
  route,
  containerClassName,
}) => {
  const { open, toggleOpen } = useSideBarStore();
  const { pathname, push } = useRouter();

  const activeStyles =
    "text-gray-900 bg-gray-100 relative py-2.5 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-1000";
  const inactiveStyles =
    "text-gray-500 hover:text-gray-900 relative py-2.5 rounded-lg cursor-pointer hover:bg-gray-50  transition-all duration-1000";

  return (
    <div className={containerClassName}>
      <li
        className={
          route.link && pathname.includes(route.link)
            ? activeStyles
            : inactiveStyles
        }
        onClick={() => {
          route.link &&
            push(route.link).then(() => {
              isMobile && toggleOpen();
            });
        }}
      >
        <div
          className={`flex relative peer ${
            open
              ? "items-start justify-start px-4 "
              : "items-center px-4 delay-300"
          }`}
        >
          <span className="flex items-center gap-x-4">
            <div className={`${!open && "sm:hidden"}`}>{route.icon}</div>

            {open && (
              <span className="text-xl font-semibold sm:text-lg">
                {route.title}
              </span>
            )}
          </span>
        </div>
        {!open && (
          <div className="text-gray-50 rounded-md shadow-E200 bg-gray-800  h-10 absolute top-0 translate-y-1/4 left-[150%] opacity-0 w-0 peer-hover:w-36 peer-hover:opacity-100 transition-all duration-300 z-0 text-lg flex items-center justify-center">
            {route.title}
          </div>
        )}
      </li>
    </div>
  );
};
