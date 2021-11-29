import { MainLayout } from "@/layout/MainLayout";
import { RoleCard } from "./RoleCard";
import RoleModal from "./roleModal";

const userRoleJSON = [
  {
    id: 3,
    title: "Assistant Developer",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 0,
  },
  {
    id: 1,
    title: "Super Admin",
    description:
      "Super Admin has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 40,
  },
  {
    id: 2,
    title: "Main Developer",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },

  {
    id: 4,
    title: "Marketing",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },
  {
    id: 5,
    title: "Account",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },
  {
    id: 6,
    title: "Support",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },
];

const RolePage = () => {
  return (
    <MainLayout>
      <div className="px-10 py-10 overflow-visible sm:p-8">
        <div className="flex flex-col space-y-2 ">
          <h1 className="text-5xl font-semibold text-gray-900">Roles</h1>
          <p className="text-xl font-semibold text-gray-500">
            Click on any role to add, update or delete permissions
          </p>
        </div>
        <div className="w-full py-12 flex flex-wrap gap-[1%] gap-y-5">
          {userRoleJSON.map((role) => (
            <RoleCard
              key={role.id}
              id={role.id}
              title={role.title}
              description={role.description}
              permissionCount={role.permissionsCount}
            />
          ))}
          <RoleModal type="add" />
        </div>
      </div>
    </MainLayout>
  );
};

export default RolePage;
