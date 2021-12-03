import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import { useState } from "react";
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
    "text-gray-500 hover:text-gray-900 py-3 rounded-lg cursor-pointer hover:bg-white";

  const onExpandChange = () => {
    setExpand((expand) => !expand);
  };

  return (
    <ul className="flex flex-col gap-y-1">
      <li onClick={() => onExpandChange()} className={mainItemStyles}>
        <div
          className={`flex relative ${
            open
              ? "items-start justify-start px-4 group"
              : "items-center px-4 delay-300 group"
          }`}
        >
          <span
            className={`flex items-center gap-x-2 w-full ${
              expand || isPathSelected ? "text-gray-800" : ""
            }`}
          >
            {subRoutes.icon}

            {open && (
              <div className={`flex items-center justify-between w-full`}>
                <span className={`text-xl font-bold sm:text-lg `}>
                  {subRoutes.title}
                </span>
                <CaretDown weight="bold" size={24} />
              </div>
            )}
          </span>

          {!open && (
            <div className="-translate-y- text-gray-50 rounded-md shadow-E200 traniti bg-gray-800  h-10 absolute left-[150%] opacity-0 w-0 group-hover:w-36 group-hover:opacity-100 transition-all duration-300 z-0 text-lg flex items-center justify-center">
              {subRoutes.title}
            </div>
          )}
        </div>
      </li>
      <Transition
        show={expand}
        enter="transition-transform duration-100"
        enterFrom="-translate-y-12 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition-transform duration-100"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-24 opacity-0"
      >
        {expand && (
          <div
            className={
              open ? "opeborder-gray-400 border-l-2 ml-8 space-y-2" : ""
            }
          >
            {expand &&
              subRoutes.children &&
              subRoutes.children.map((route) => {
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
      </Transition>
    </ul>
  );
};