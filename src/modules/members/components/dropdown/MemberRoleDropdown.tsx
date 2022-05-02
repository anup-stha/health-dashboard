/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";

import { RoleAccess } from "@/types";

interface MemberRoleDropdownProps {
  roleList?: RoleAccess[];
  selectedRole?: RoleAccess;
  setSelectedRole?: (selected_role: RoleAccess) => void;
}

export const MemberRoleDropdown = ({
  roleList: _roleList,
  selectedRole: _selectedRole,
  setSelectedRole: _setSelectedRole,
}: MemberRoleDropdownProps) => {
  const router = useRouter();
  const roleList = _roleList ?? useAuthStore.getState()?.user?.role.role_access;

  const selectedRole = useCurrentMemberStore((state) => state.role);
  const setSelectedRole = useCurrentMemberStore((state) => state.setCurrentRole);

  useEffect(() => {
    Object.keys(selectedRole).length !== 0 &&
      router.isReady &&
      router.replace(
        {
          query: { ...router.query, page: 1 },
        },
        undefined,
        { shallow: true }
      );
  }, [selectedRole.slug, _selectedRole?.slug]);

  return (
    <div className="w-64 capitalize z-10">
      <Listbox value={_selectedRole ?? selectedRole} onChange={_setSelectedRole ?? setSelectedRole}>
        <div className="relative">
          <Listbox.Button
            data-testid="role-dropdown-btn"
            className="cursor-pointer relative w-full py-5 px-6 text-left bg-white rounded-md shadow-sm ring-1 ring-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-primary-300 focus-visible:ring-offset-2 focus-visible:border-primary-500 text-xl font-medium text-gray-500"
          >
            <span className="block truncate">
              {_selectedRole && Object.values(_selectedRole).length !== 0 ? _selectedRole.name : selectedRole.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-2 overflow-auto text-lg bg-white rounded-md shadow-sm max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {roleList?.map((role) => (
                <Listbox.Option
                  key={role.id}
                  data-testid={`${role.name}-btn`}
                  className={({ active }) =>
                    `${active ? "text-primary-500 bg-gray-50" : "text-gray-900"}
                          cursor-pointer select-none relative py-4 pl-10 pr-4 `
                  }
                  value={role}
                >
                  {() => {
                    return (
                      <>
                        <span
                          className={`${
                            (_selectedRole ? role.id === _selectedRole?.id : role.id === selectedRole.id) &&
                            "text-primary-500"
                          } block truncate capitalize`}
                        >
                          {role.name}
                        </span>
                        {(_selectedRole ? role.id === _selectedRole?.id : role.id === selectedRole.id) ? (
                          <span className="text-primary-600 absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
