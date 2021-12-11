/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useRoleStore } from "../useRoleStore";
import { RoleMemberCategoryModal } from "../modal/roleMemberCategoryModal";
import { RoleMemberCategoryTable } from "../table/roleMemberCategoryTable";

export const RoleMemberCategory = () => {
  const { selectedRole } = useRoleStore();

  return (
    <Disclosure>
      {({ open }) => (
        <div className="bg-white shadow-E500 w-2/3 py-8 px-8 rounded-sm flex flex-col text-left">
          <Disclosure.Button className="w-full flex text-left justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Member Detail Category
              </h1>
              <p className="text-lg font-semibold text-gray-500">
                Click on any field to add, update or remove details fied for{" "}
                {selectedRole.name}
              </p>
            </div>
            <div className="flex items-center">
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-12 h-12 text-green-500`}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className=" pt-4 pb-2 text-sm text-gray-500">
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div className="w-full flex flex-col space-y-4">
                <RoleMemberCategoryTable />
                <div className="self-end">
                  {open && <RoleMemberCategoryModal type="add" />}
                </div>
              </div>
            </Transition>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
