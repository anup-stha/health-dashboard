/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { RoleMemberCategoryModal } from "../modal/roleMemberCategoryModal";
import { RoleMemberCategoryTable } from "../table/roleMemberCategoryTable";
import { useRoleStore } from "../useRoleStore";

export const RoleMemberCategory = () => {
  const { selectedRole } = useRoleStore();

  return (
    <Disclosure>
      {({ open }) => (
        <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex flex-col text-left lg:w-full">
          <Disclosure.Button className="w-full flex text-left justify-between items-center">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Member Detail Category</h1>
              <p className="text-lg font-medium text-gray-500">
                Click on any field to add, update or remove details field for {selectedRole.name}
              </p>
            </div>
            <div className="flex items-center" data-testid="disclosure_open">
              <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-12 h-12 text-primary-500`} />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className=" pt-4 pb-2 text-sm text-gray-500">
            <Transition>
              <div className="w-full flex flex-col space-y-4">
                <RoleMemberCategoryTable />
                <div className="self-end">{open && <RoleMemberCategoryModal type="add" />}</div>
              </div>
            </Transition>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
