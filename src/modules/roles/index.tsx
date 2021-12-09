import { RoleCard } from "./cards/RoleCard";
import RoleModal from "./modal/roleModal";
import { useRoleStore } from "./useRoleStore";

const RolePage = () => {
  const roleList = useRoleStore().roleList;

  return (
    <div className="px-10 py-10 overflow-visible sm:p-8 space-y-8">
      <div className="flex flex-col space-y-2 ">
        <h1 className="text-5xl font-semibold text-gray-900">Roles</h1>
        <p className="text-xl font-semibold text-gray-500">
          Click on any role to add, update or delete permissions
        </p>
      </div>
      <div className="w-full grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6">
        {roleList.map((role) => (
          <RoleCard
            key={role.id}
            id={role.id}
            title={role.name}
            description={role.desc}
            permissionCount={role.permissions.length}
            memberLimit={role.member_limit}
            isPublic={role.public}
          />
        ))}
        <RoleModal type="add" />
      </div>
    </div>
  );
};

export default RolePage;
