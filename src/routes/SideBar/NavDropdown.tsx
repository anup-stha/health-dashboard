/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/9/22, 7:04 PM
 *
 *
 */

import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import React, { Fragment, useState } from "react";

import { NavItem } from "./NavItem";
import { RouteObjectType } from "./routes";
import { useSideBarStore } from "./useSideBarStore";

export type NavDropdownPropType = {
  subRoutes: RouteObjectType;
};

export const NavDropdown: React.FC<NavDropdownPropType> = ({ subRoutes }) => {
  const { pathname } = useRouter();
  const isPathSelected = subRoutes.children?.some(
    (route) => route.link && pathname.includes(route.link)
  );
  const [expand, setExpand] = useState(isPathSelected);

  const { open } = useSideBarStore();

  const mainItemStyles =
    "text-gray-500 hover:text-gray-900 py-2.5 rounded-lg cursor-pointer hover:bg-white relative";

  const onExpandChange = () => {
    setExpand((expand) => !expand);
  };

  return (
    <ul className="flex flex-col w-full">
      <li className={mainItemStyles} onClick={() => onExpandChange()}>
        <div className="peer flex w-full">
          <div
            className={`flex relative items-start justify-start px-4 w-full ${
              open ? "translate-x-0" : "-translate-x-96 w-0"
            } transition-transform duration-100 w-full`}
          >
            <span
              className={`flex items-center gap-x-4 text-lg w-full ${
                expand ? "font-bold text-gray-900" : "font-semibold"
              } `}
            >
              <div className="sm:hidden">{subRoutes.icon}</div>

              <div className="flex items-center justify-between w-full">
                <span className="sm:text-lg">{subRoutes.title}</span>
                <CaretDown weight="bold" size={24} />
              </div>
            </span>
          </div>

          <div
            className={`flex relative items-center  ${
              !open
                ? "opacity-100 -translate-x-8 transition-opacity duration-500 px-4"
                : "opacity-0 w-0 p-0"
            }  `}
          >
            <div className="sm:hidden">{subRoutes.icon}</div>
          </div>
        </div>

        {!open && (
          <div className="pointer-events-none text-gray-50 rounded-md shadow-E200 transition-all bg-gray-800 h-10 top-0 translate-y-1/4 absolute left-[150%] opacity-0 w-0 peer-hover:w-36 peer-hover:opacity-100 transition-all duration-300 z-0 text-lg flex items-center justify-center">
            {subRoutes.title}
          </div>
        )}
      </li>

      {expand && (
        <div
          className={open ? "border-gray-300 border-l-2 ml-8 space-y-1" : ""}
        >
          {expand &&
            subRoutes.children &&
            subRoutes.children.map((route) => {
              if (route.link === false) {
                if (route.modal) {
                  const Modal = route.modal;

                  return (
                    <Fragment key={`${route.id}-${route.title}`}>
                      <Modal>
                        <NavItem
                          route={route}
                          key={`${route.id}-${route.title}`}
                          containerClassName={open ? `pl-4` : ""}
                        />
                      </Modal>
                    </Fragment>
                  );
                }
              }

              if (route.children) {
                return (
                  <NavDropdown
                    subRoutes={route}
                    key={`${route.id}-${route.title}`}
                  />
                );
              }

              return (
                <NavItem
                  key={`${route.id}-${route.title}`}
                  route={route}
                  containerClassName={open ? `pl-4` : ""}
                />
              );
            })}
        </div>
      )}
    </ul>
  );
};
