/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 9:24 AM
 *
 *
 */

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";

import { Role } from "@/types";

interface MemberRoleDropdownProps {
  roleList?: Role[];
  selectedRole?: Role;
  setSelectedRole?: (selected_role: Role) => void;
}

export const MemberRoleDropdown = ({
  roleList: _roleList,
  selectedRole: _selectedRole,
  setSelectedRole: _setSelectedRole,
}: MemberRoleDropdownProps) => {
  const router = useRouter();
  const roleList =
    _roleList ??
    useRoleStore
      .getState()
      .roleList.sort((a, b) => a.name.localeCompare(b.name));

  const selected = useCurrentMemberStore((state) => state.role);
  const setSelected = useCurrentMemberStore((state) => state.setCurrentRole);

  useEffect(() => {
    Object.keys(selected).length !== 0 &&
      router.isReady &&
      router.replace(
        {
          query: { ...router.query, page: 1 },
        },
        undefined,
        { shallow: true }
      );
  }, [selected.slug, _selectedRole?.slug]);

  return (
    <div className="w-64 capitalize z-10">
      <Listbox
        value={_selectedRole ?? selected}
        onChange={_setSelectedRole ?? setSelected}
      >
        <div className="relative">
          <Listbox.Button
            data-testid="role-dropdown-btn"
            className="cursor-pointer relative w-full py-4 px-6 text-left bg-white rounded-sm shadow-E500 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-green-300 focus-visible:ring-offset-2 focus-visible:border-green-500 text-xl font-semibold text-gray-500"
          >
            <span className="block truncate">
              {_selectedRole && Object.values(_selectedRole).length !== 0
                ? _selectedRole.name
                : selected.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-2 overflow-auto text-lg bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {roleList.map((role) => (
                <Listbox.Option
                  key={role.id}
                  data-testid={`${role.name}-btn`}
                  className={({ active }) =>
                    `${active ? "text-green-900 bg-green-100" : "text-gray-900"}
                          cursor-pointer select-none relative py-4 pl-10 pr-4 `
                  }
                  value={role}
                >
                  {({ selected, active }) => {
                    return (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          }  block truncate capitalize`}
                        >
                          {role.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-green-600" : "text-green-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
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
