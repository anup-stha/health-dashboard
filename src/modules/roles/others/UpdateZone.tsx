/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import RoleModal from "@/modules/roles/modal/roleModal";

export const UpdateZone = ({ idX }: any) => {
  return (
    <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex justify-between items-center lg:w-full">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Edit this role</h1>
        <p className="text-lg font-medium text-gray-500">
          Once you edit a role, you cannot edit this role for 3 days. Please be certain.
        </p>
      </div>
      <RoleModal type="edit" id={idX} />
    </div>
  );
};
