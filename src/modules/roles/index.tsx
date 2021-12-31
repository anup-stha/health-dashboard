/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/31/21, 1:15 PM
 *
 *
 */

import { RoleCard } from "./cards/RoleCard";
import RoleModal from "./modal/roleModal";
import { useRoleStore } from "./useRoleStore";

const RolePage = () => {
  const roleList = useRoleStore((state) => state.allRoleList.data);

  return (
    <div className="px-10 py-10 overflow-visible sm:px-6 sm:py-6 space-y-8">
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
            slug={role.slug}
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
