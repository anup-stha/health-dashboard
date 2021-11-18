import { Sidebar } from "@/routes/Sidebar";
import { useSideBarStore } from "@/routes/useSideBarStore";
import { NextPage } from "next";
import { DashboardLayout } from "./dashboard";
import { addons, mockChannel } from "@storybook/addons";
import { listOrganisations } from "@/lib/requests/authRequests";
import { useEffect, useState } from "react";
import { OrganizationListType } from "@/types";
import { Table } from "@/components/Table/Table";
import { OrgCard, OrgTableRow } from "@/components/Table/OrgTableRow";

addons.setChannel(mockChannel());

const Organization: NextPage = () => {
  const { open } = useSideBarStore();
  const [organizationList, setOrganizationList] =
    useState<OrganizationListType>([]);

  useEffect(() => {
    const listOrg = async () => {
      await listOrganisations().then((response) =>
        setOrganizationList(response.data)
      );
    };
    listOrg();
  }, []);

  console.log(organizationList);

  return (
    <DashboardLayout>
      <div className="relative">
        <Sidebar />
        <div
          className={
            !open ? "ml-36 mt-24 mb-8 mr-12" : "ml-[20%] mt-24 mr-12 mb-8"
          }
        >
          <Table
            data={organizationList}
            tableHeadings={[
              "Organisation Name",
              "Active Status",
              "Verified",
              "Added Date",
              "Created By",
            ]}
            tableRowComponent={<OrgTableRow />}
            tableMobileViewComponent={<OrgCard />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Organization;
