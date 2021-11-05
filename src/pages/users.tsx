import { TableWithPagination } from "@/components/TableWithPagination";
import { Sidebar } from "@/routes/Sidebar";
import { useSideBarStore } from "@/routes/useSideBarStore";
import { NextPage } from "next";
import { DashboardLayout } from "./dashboard";
import { addons, mockChannel } from "@storybook/addons";

addons.setChannel(mockChannel());

const Users: NextPage = () => {
  const { open } = useSideBarStore();

  return (
    <DashboardLayout>
      <div className="relative">
        <Sidebar />
        <div className={!open ? "ml-32 mt-24" : "ml-[20%] mt-24 mr-8"}>
          <TableWithPagination />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
