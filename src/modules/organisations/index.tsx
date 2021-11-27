import Image from "next/image";

import { OrganisationModal } from "@/modules/organisations/orgModal";
import { MainLayout } from "@/layout/MainLayout";
import { OrgTable } from "./orgTable";
import { useOrgStore } from "./useOrgStore";

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

const OrganisationPage = () => {
  const { error } = useOrgStore();

  return (
    <MainLayout>
      {error.state ? (
        <div className="flex items-center justify-center">
          <Image
            src={"/assets/server-error.svg"}
            alt="Error"
            width={700}
            height={700}
          />
        </div>
      ) : (
        <div className="px-10 py-10 overflow-visible sm:p-8">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
              <h1 className="text-4xl font-semibold text-gray-850">
                Organisations
              </h1>
              <OrganisationModal
                type="add"
                initialValues={OrganisationInitialFormData}
              />
            </div>
            <OrgTable />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default OrganisationPage;
