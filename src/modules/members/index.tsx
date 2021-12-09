import { MemberModal } from "@/modules/members/modal/memberModal";
import { MainLayout } from "@/layout/MainLayout";
import { MemberTable } from "./table/memberTable";
import { MemberRoleDropdown } from "./others/memberRoleDropDown";

export const MemberPage = () => {
  return (
    <MainLayout>
      <div className="px-10 py-10 overflow-visible sm:p-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
            <div>
              <h1 className="text-4xl font-semibold text-gray-850">Members</h1>
              <p className="text-lg font-semibold text-gray-500">
                List of all members in a tabulated view. If not data found,
                please change role.
              </p>
            </div>

            <div className="flex space-x-4">
              <MemberRoleDropdown />
              <MemberModal type="add" />
            </div>
          </div>
          <MemberTable />
        </div>
      </div>
    </MainLayout>
  );
};
