import Image from "next/image";
import { useRouter } from "next/router";

import { SideBarNavItem as NavItem } from "@/routes/SideBar/SidebarNavItem";
import { OrganisationNavRoutes as NavRoutes } from "./routes";

import Avatar from "@/styles/avatar.svg";
import SuperUserIlustration from "@/styles/superuser-illustration.svg";
import { useSideBarStore } from "./useSideBarStore";
import { Transition } from "@headlessui/react";

export const Sidebar: React.FC = () => {
  const { open } = useSideBarStore();
  const router = useRouter();

  return (
    <nav
      className={`${
        open ? "w-1/6 p-6 sm:w-1/2 md:w-1/3 lg:w-1/4" : "w-24 p-4"
      } transition-all duration-100 h-screen min-h-0 z-20 fixed shadow-E600 bg-warmGray-100 space-y-12 sidebar  text-3xl flex flex-col justify-between `}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex flex-col space-y-12">
        {open ? (
          <Transition appear show={open} as="div">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className=" w-full bg-white shadow-E500 rounded-md p-4 flex items-center space-x-xs">
                <div className="w-16 h-16 object-contain  relative">
                  <Image
                    src={Avatar}
                    layout="fill"
                    className="absolute"
                    objectFit="contain"
                    alt="Error"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-black font-semibold text-xl overflow-hidden truncate">
                    Admin Person
                  </span>
                  <span className="text-gray-500 font-semibold tracking-wider text-sm ">
                    Superuser
                  </span>
                </div>
              </div>
            </Transition.Child>
          </Transition>
        ) : (
          <div className="py-4">
            <div className="w-16 h-16 object-contain  relative">
              <Image
                src={Avatar}
                layout="fill"
                className="absolute"
                objectFit="contain"
                alt="Avatar"
              />
            </div>
          </div>
        )}

        <div className="w-full">
          <ul className="flex flex-col w-full gap-y-2">
            {NavRoutes.map((route) => (
              <NavItem
                link={route.link}
                state={route.link === router.pathname ? "active" : "inactive"}
                title={route.title}
                key={route.title}
              >
                {route.icon}
              </NavItem>
            ))}
          </ul>
        </div>
      </div>
      {open && (
        <Transition appear show={open} as="div">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0  -translate-x-32"
            enterTo="opacity-100  translate-x-0"
            leave="ease-in duration-100"
            leaveFrom="opacity-100  translate-x-0"
            leaveTo="opacity-0 -translate-x-32"
          >
            <div className="w-full flex flex-col space-y-4 delay-1000 transition-none duration-500">
              <div className="p-1">
                <Image
                  src={SuperUserIlustration}
                  alt="Super User Illustration"
                />
              </div>

              <div className="text-sm text-gray-700 font-bold text-center">
                &#169; Copyright by Sunya Health Pvt. Ltd.
              </div>
            </div>
          </Transition.Child>
        </Transition>
      )}
    </nav>
  );
};
