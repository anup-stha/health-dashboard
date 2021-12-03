import { WarningButton } from "@/components/Button";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { Permissions } from "@/modules/permissions";
import RoleModal from "@/modules/roles/roleModal";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { listRoleDetails } from "@/services/requests/authRequests";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";

const RoleDetailPage = ({ idX }: any) => {
  const {
    loading,
    setLoading,
    getRoleListFromServer,
    setSelectedRole,
    selectedRole,
  } = useRoleStore();

  useEffect(() => {
    const listRoles = async () => {
      await getRoleListFromServer()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    };
    const getRoleDetail = async () => {
      await listRoleDetails(idX).then((response) =>
        setSelectedRole(response.data.data)
      );
    };
    listRoles();
    idX && getRoleDetail();
  }, []);

  return !loading ? (
    <MainLayout>
      <div className="px-10 py-10 overflow-visible sm:p-8">
        <div className="flex flex-col space-y-8">
          <div className="flex items-end space-x-2 ">
            <h1 className="text-5xl font-semibold text-gray-900">
              {selectedRole.name}
            </h1>
          </div>
          <hr />
          <Permissions />
          <hr />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Danger Zone
              </h1>
              <p className="text-lg font-semibold text-gray-500">
                Please be careful with anything you do here
              </p>
            </div>

            <div className="bg-white shadow-E500 w-2/3 py-10 px-8 rounded-sm flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Edit this role
                </h1>
                <p className="text-lg font-semibold text-gray-500">
                  Once you edit a role, you cannot edit this role for 3 days.
                  Please be certain.
                </p>
              </div>
              <RoleModal type="edit" id={idX} />
            </div>
            <div className="bg-white shadow-E500 w-2/3 py-10 px-8 rounded-sm flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Delete this role
                </h1>
                <p className="text-lg font-semibold text-gray-500">
                  Once you delete a repository, there is no going back. Please
                  be certain.
                </p>
              </div>
              <DeleteModal
                closeButton={<WarningButton>Delete</WarningButton>}
                title="You are about to delete this role"
                subTitles={[
                  "This will delete your role forever",
                  "Are you sure ?",
                ]}
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </MainLayout>
  ) : null;
};

export default withRole(withAuth(RoleDetailPage));

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      idX: context.query.permission,
    },
  };
};
