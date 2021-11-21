import { Sidebar } from "@/routes/sidebar";
import { SideBarToggleButton as ToggleButton } from "../routes/sidebar/SidebarToggleButton";
import { useSideBarStore } from "../routes/sidebar/useSideBarStore";
import { MainHeader } from "./MainHeader";

const MainLayout = ({ children }: any) => {
  const { open } = useSideBarStore();

  return (
    <div suppressHydrationWarning={true}>
      <Sidebar />
      <ToggleButton />
      <div
        className={`${
          open ? " relative w-5/6 ml-[16.67%]" : "relative w-full pl-24"
        } transition-all duration-200 `}
      >
        <MainHeader />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
