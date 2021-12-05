import { OrganisationModal } from "@/modules/member/orgModal";
import { MainLayout } from "@/layout/MainLayout";
import { OrgTable } from "./memberTable";
import { MemberRoleDropdown } from "./memberRoleDropDown";

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
  return (
    <MainLayout>
      <div className="px-10 py-10 overflow-visible sm:p-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
            <h1 className="text-4xl font-semibold text-gray-850">Members</h1>

            <div className="flex space-x-4">
              <MemberRoleDropdown />
              <OrganisationModal
                type="add"
                initialValues={OrganisationInitialFormData}
              />
            </div>
          </div>

          <OrgTable />
        </div>
      </div>
    </MainLayout>
  );
};

export default OrganisationPage;
