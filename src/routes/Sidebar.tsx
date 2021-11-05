import { useState } from "react";
import MockLogo from "./healthy-lifestyle-logo.png";
import Image from "next/image";
import {
  CaretLeft,
  CaretRight,
  ChartLineUp,
  HouseSimple,
  SignOut,
  Users,
} from "phosphor-react";
import { SideBarNavItem as NavItem } from "./SidebarNavItem";
import { useSideBarStore } from "./useSideBarStore";
import { Button, IconButton } from "@/components/Button";
import { logoutUser } from "@/lib/requests";
import { useTokenStore } from "@/modules/auth/useTokenStore";
import { useRouter } from "next/router";

const StaffSideBarRoutes = [
  {
    title: "Dashboard",
    icon: <HouseSimple />,
    state: "active",
    link: "/dashboard",
  },
  {
    title: "Statistics",
    icon: <ChartLineUp />,
    state: "inactive",
    link: "/stat",
  },
  {
    title: "Users",
    icon: <Users />,
    state: "inactive",
    link: "/users",
  },
];

export const Sidebar = () => {
  const { open, toggleOpen } = useSideBarStore();
  const [loading, setLoading] = useState(false);

  const onLogOut = async () => {
    setLoading(true);
    await logoutUser()
      .then(() => {
        useTokenStore.getState().removeTokens();
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const router = useRouter();
  console.log(router.pathname);

  return (
    <div
      className={`${
        open
          ? "w-[16.5%]  flex flex-col items-start justify-between sm:w-[60%] md:w-[40%] lg:w-[30%]"
          : "w-24 flex flex-col items-center justify-between"
      } fixed  top-0 h-screen bg-white shadow-E400 sm:h-[103vh] text-3xl text-gray-850 px-4 py-8 z-20 transition-all duration-300 sm:px-3`}
    >
      <div className="w-16 relative">
        <Image src={MockLogo} objectFit="contain" />
      </div>

      <div
        onClick={() => toggleOpen()}
        className={`absolute w-12 h-12 top-10 bg-white ${
          !open
            ? "left-28 sm:left-[6.5rem]"
            : "left-[100%] translate-x-[-50%] sm:left-[55%] md:left-[37.5%] lg:left-[28%]"
        }  rounded-full flex justify-center items-center text-gray-600 shadow-xl cursor-pointer transition-all duration-00`}
      >
        {!open ? <CaretRight weight="bold" /> : <CaretLeft weight="bold" />}
      </div>
      <nav className="w-full">
        <ul className="flex flex-col w-full gap-y-4">
          {StaffSideBarRoutes.map((route) => (
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
      </nav>
      {!open ? (
        <IconButton loading={loading} onClick={() => onLogOut()}>
          {!loading && <SignOut size={26} weight="bold" />}
        </IconButton>
      ) : (
        <Button loading={loading} onClick={() => onLogOut()} width="full">
          Log Out
        </Button>
      )}
    </div>
  );
};
