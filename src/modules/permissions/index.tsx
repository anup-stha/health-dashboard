/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/12/21, 10:07 AM
 *
 *
 */

import Image from "next/image";
import PermissionSaveModal from "./permissionSaveModal";
import { useRoleStore } from "../roles/useRoleStore";

export const Permissions = () => {
  const { selectedPermission, setSelectedPermission } = useRoleStore();

  const inactiveClass =
    " w-full bg-white shadow-md flex flex-col rounded-md px-4 py-6 ";
  const activeClass =
    " w-full bg-white shadow-E100 flex flex-col rounded-md px-4 py-6 ring-2 ring-opacity-90 ring-green-600 text-white transition-all duration-100";

  const selectHandler = (id: any) => {
    const clickedItem = selectedPermission.all.filter(
      (element) => element.id === id
    )[0];
    const alreadyClickedItem = selectedPermission.current.filter(
      (element) => element.id === id
    );

    if (alreadyClickedItem.length === 0) {
      setSelectedPermission({
        current: [...selectedPermission.current, clickedItem],
      });
    } else {
      setSelectedPermission({
        current: selectedPermission.current.filter(
          (selected) => selected.id !== alreadyClickedItem[0].id
        ),
      });
    }

    if (selectedPermission.initial.some((element) => element.id === id)) {
      !selectedPermission.deselected.includes(id)
        ? setSelectedPermission({
            deselected: [...selectedPermission.deselected, id],
          })
        : setSelectedPermission({
            deselected: selectedPermission.deselected.filter(
              (deselected) => deselected !== id
            ),
          });
    } else {
      !selectedPermission.selected.includes(id)
        ? setSelectedPermission({
            selected: [...selectedPermission.selected, id],
          })
        : setSelectedPermission({
            selected: selectedPermission.selected.filter(
              (selected) => selected !== id
            ),
          });
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Permissions</h1>
        <p className="text-lg font-semibold text-gray-500">
          Click on any permission to add, update or remove permissions for super
          user
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 3xl:flex 3xl:flex-wrap gap-8">
        {selectedPermission.all.map((select: any) => {
          const isItemSelected = selectedPermission.current.some(
            (element: any) => element.id === select.id
          );

          return (
            <div
              className={isItemSelected ? activeClass : inactiveClass}
              key={select.id}
            >
              <div className="flex items-center justify-between h-full space-x-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <Image
                      src="/assets/permission1.png"
                      alt={select.name}
                      width={64}
                      height={64}
                      objectFit="cover"
                      layout="fixed"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-2xl text-gray-800 font-semibold line-clamp-1 ">
                      {select.name}
                    </span>
                    <span className="text-lg text-gray-500 font-medium w-3/4 line-clamp-2">
                      {select.description}
                    </span>
                  </div>
                </div>
                <div className="max-w-sm mx-auto">
                  <label className="inline-flex items-center">
                    <input
                      className="text-green-500 w-8 h-8 mr-2 cursor-pointer focus:ring-green-400 focus:ring-opacity-25 border border-gray-300 rounded-lg"
                      type="checkbox"
                      checked={isItemSelected}
                      onChange={() => selectHandler(select.id)}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="self-start">
        <PermissionSaveModal />
      </div>
    </div>
  );
};
