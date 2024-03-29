/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Heading } from "@/components/Headings";

import { RoleCard } from "./cards/RoleCard";
import RoleModal from "./modal/roleModal";
import { useRoleStore } from "./useRoleStore";

const RolePage = () => {
  const roleList = useRoleStore((state) => state.roleList);

  return (
    <div className="px-10 py-10 overflow-visible sm:px-6 sm:py-6 space-y-8">
      <Heading title="Roles" subtitle="Click on any role to add, update or delete permissions." />
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
