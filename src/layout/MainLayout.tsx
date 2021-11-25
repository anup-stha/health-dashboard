import { Sidebar } from "@/routes/SideBar";
import { SideBarToggleButton as ToggleButton } from "../routes/SideBar/SidebarToggleButton";
import { useSideBarStore } from "../routes/SideBar/useSideBarStore";
import { MainHeader } from "./MainHeader";

export const MainLayout = ({ children }: any) => {
  const { open } = useSideBarStore();

  return (
    <div suppressHydrationWarning={true}>
      <Sidebar />
      <ToggleButton />
      <div
        className={`${
          open
            ? " relative w-5/6 ml-[16.67%] md:w-full md:ml-0"
            : "relative w-full pl-24"
        } transition-all duration-200 `}
      >
        <MainHeader />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};
