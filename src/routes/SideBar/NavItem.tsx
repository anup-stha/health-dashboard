/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { useRouter } from "next/router";
import { RouteObjectType } from "./routes";
import { useSideBarStore } from "./useSideBarStore";

type NavItemProps = {
  route: RouteObjectType;
  containerClassName?: string;
  onChange?: () => void;
};

export const NavItem: React.FC<NavItemProps> = ({
  route,
  containerClassName,
}) => {
  const { open } = useSideBarStore();
  const { pathname, push } = useRouter();

  const activeStyles =
    "text-gray-900 bg-gray-100  py-3 rounded-lg cursor-pointer hover:bg-gray-200 ";
  const inactiveStyles =
    "text-gray-500 hover:text-gray-900 py-3 rounded-lg cursor-pointer hover:bg-white ";

  return (
    <div className={containerClassName}>
      <li
        className={
          route.link && pathname.includes(route.link)
            ? activeStyles
            : inactiveStyles
        }
        onClick={() => route.link && push(route.link)}
      >
        <div
          className={`flex relative ${
            open
              ? "items-start justify-start px-4"
              : "items-center px-4 delay-300"
          }`}
        >
          <span className="flex items-center gap-x-4 peer">
            <div>{route.icon}</div>

            {open && (
              <span className="text-xl font-semibold sm:text-lg">
                {route.title}
              </span>
            )}
          </span>

          {!open && (
            <div className="text-gray-50 rounded-md shadow-E200 bg-gray-800  h-10 absolute left-[150%] opacity-0 w-0 peer-hover:w-36 peer-hover:opacity-100 transition-all duration-300 z-0 text-lg flex items-center justify-center">
              {route.title}
            </div>
          )}
        </div>
      </li>
    </div>
  );
};
