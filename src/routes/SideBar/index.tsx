import Image from "next/image";
import { useRouter } from "next/router";

import { SideBarNavItem as NavItem } from "@/routes/SideBar/SidebarNavItem";
import { OrganizationNavRoutes as NavRoutes } from "./routes";

import Avatar from "@/styles/avatar.svg";
import SuperUserIlustration from "@/styles/superuser-illustration.svg";
import { useSideBarStore } from "./useSideBarStore";

export const Sidebar: React.FC = () => {
  const { open } = useSideBarStore();
  const router = useRouter();

  return (
    <nav
      className={`${
        open ? "w-1/6 p-6" : "w-24 p-4"
      } transition-all duration-200 h-screen min-h-0 z-20 fixed shadow-E600 bg-warmGray-100 space-y-12 sidebar  text-3xl flex flex-col justify-between `}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex flex-col space-y-12">
        {open ? (
          <div className=" w-full bg-white shadow-E500 rounded-md p-4 flex items-center space-x-xs">
            <div className="w-16 h-16 object-contain  relative">
              <Image
                src={Avatar}
                layout="fill"
                className="absolute"
                objectFit="contain"
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
        ) : (
          <div className="py-4">
            <div className="w-16 h-16 object-contain  relative">
              <Image
                src={Avatar}
                layout="fill"
                className="absolute"
                objectFit="contain"
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