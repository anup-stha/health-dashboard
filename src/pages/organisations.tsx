import { NextPage } from "next";
import { addons, mockChannel } from "@storybook/addons";
import { listOrganisations } from "@/lib/requests/authRequests";
import { useEffect, useState } from "react";
import { OrganizationListType } from "@/types";
import { Table } from "@/components/Table/Table";
import { OrgCard, OrgTableRow } from "@/components/Table/OrgTableRow";
import MainLayout from "@/layout/MainLayout";
import withAuth from "@/hoc/withAuth";
import ErrorImage from "@/styles/server-error.svg";
import Image from "next/image";

addons.setChannel(mockChannel());

const Organization: NextPage = () => {
  const [organizationList, setOrganizationList] =
    useState<OrganizationListType>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("ok");
    const listOrg = async () => {
      await listOrganisations()
        .then((response) => setOrganizationList(response.data))
        .catch((error) => setError(true));
    };
    listOrg();
  }, []);

  /**  !open ? "ml-36 mt-24 mb-8 mr-12" : "ml-[20%] mt-24 mr-12 mb-8" */

  return (
    <MainLayout>
      {!error ? (
        <div className="flex flex-col">
          <div>
            <h1>Organisations</h1>
          </div>
          <div className="px-12 py-4">
            <Table
              data={organizationList}
              tableHeadings={[
                "Organisation Name",
                "Active Status",
                "Verified",
                "Added Date",
                "Owner",
              ]}
              tableRowComponent={<OrgTableRow />}
              tableMobileViewComponent={<OrgCard />}
            />{" "}
          </div>
        </div>
      ) : (
        <Image src={ErrorImage} alt="Error" />
      )}
    </MainLayout>
  );
};

export default withAuth(Organization);
