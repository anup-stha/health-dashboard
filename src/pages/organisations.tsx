import { NextPage } from "next";
import { addons, mockChannel } from "@storybook/addons";
import { listOrganisations } from "@/lib/requests/authRequests";
import { useEffect, useState } from "react";
import { Table } from "@/components/Table/Table";
import { OrgCard, OrgTableRow } from "@/components/Table/OrgTableRow";
import MainLayout from "@/layout/MainLayout";
import withAuth from "@/hoc/withAuth";
import ErrorImage from "@/styles/server-error.svg";
import Image from "next/image";
import { OrganisationModal } from "@/components/model";
import { useOrgStore } from "@/modules/organisations/useOrgStore";

// import OrganisationAddModal from "@/components/model";

addons.setChannel(mockChannel());

interface Map {
  [key: string]: any;
}

const OrganisationInitialFormData: Map = {
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

export type OrganisationIntialFormDataType = typeof OrganisationInitialFormData;

const Organisation: NextPage = () => {
  const {
    organisationList: orgList,
    setOrgList,
    loading,
    toggleLoading,
  } = useOrgStore();

  const [error, setError] = useState(false);

  useEffect(() => {
    const listOrg = async () => {
      toggleLoading();
      await listOrganisations()
        .then((response) => {
          setOrgList(response.data);
          toggleLoading();
        })
        .catch((error) => setError(true));
    };
    orgList.length === 0 && listOrg();
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
                initialValues={OrganisationInitialFormData}
              />
            </div>
            <Table
              data={orgList}
              tableHeadings={[
                "Organisation Name",
                "Active Status",
                "Verified",
                "Added Date",
                "Owner",
              ]}
              loading={loading}
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

export default withAuth(Organisation);
