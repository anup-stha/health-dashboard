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
import { OrganisationModal } from "@/components/model";

// import OrganisationAddModal from "@/components/model";

addons.setChannel(mockChannel());

interface Map {
  [key: string]: any;
}

const OrganizationInitialFormData: Map = {
  name: "",
  active: false,
  verified: false,
  owner: "sunya",
  logo: "",
  description: "",
  website: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  address: "",
  municipality: "",
  ward: "",
};

export type OrganisationIntialFormDataType = typeof OrganizationInitialFormData;

const Organization: NextPage = () => {
  const [organizationList, setOrganizationList] =
    useState<OrganizationListType>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
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
        <div className="px-10 py-12">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-semibold text-gray-850">
                Organisations
              </h1>
              <OrganisationModal
                type="add"
                initialValues={OrganizationInitialFormData}
                setOrganisationList={setOrganizationList}
              />
            </div>
            <Table
              data={organizationList}
              tableHeadings={[
                "Organisation Name",
                "Active Status",
                "Verified",
                "Added Date",
                "Owner",
              ]}
              setOrganisationList={setOrganizationList}
              tableRowComponent={<OrgTableRow />}
              tableMobileViewComponent={<OrgCard />}
            />
          </div>
        </div>
      ) : (
        <Image src={ErrorImage} alt="Error" />
      )}
    </MainLayout>
  );
};

export default withAuth(Organization);
