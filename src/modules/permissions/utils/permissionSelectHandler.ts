/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Permission } from "@/types";

type SelectedPermission = {
  all: Permission[];
  initial: Permission[];
  current: Permission[];
  selected: number[];
  deselected: number[];
};

type SetSelectedPermission = ({ current, initial, selected, deselected, all }: any) => void;

type PermissionSelectHandlerProps = {
  permissionId: number;
  selectedPermission: SelectedPermission;
  setSelectedPermission: SetSelectedPermission;
};

export const permissionSelectHandler = ({
  permissionId,
  selectedPermission,
  setSelectedPermission,
}: PermissionSelectHandlerProps) => {
  const clickedItem = selectedPermission.all.filter((element) => element.id === permissionId)[0];
  const alreadyClickedItem = selectedPermission.current.filter((element) => element.id === permissionId);

  if (alreadyClickedItem.length === 0) {
    setSelectedPermission({
      current: [...selectedPermission.current, clickedItem],
    });
  } else {
    setSelectedPermission({
      current: selectedPermission.current.filter((selected) => selected.id !== alreadyClickedItem[0].id),
    });
  }

  if (selectedPermission.initial.some((element) => element.id === permissionId)) {
    !selectedPermission.deselected.includes(permissionId)
      ? setSelectedPermission({
          deselected: [...selectedPermission.deselected, permissionId],
        })
      : setSelectedPermission({
          deselected: selectedPermission.deselected.filter((deselected) => deselected !== permissionId),
        });
  } else {
    !selectedPermission.selected.includes(permissionId)
      ? setSelectedPermission({
          selected: [...selectedPermission.selected, permissionId],
        })
      : setSelectedPermission({
          selected: selectedPermission.selected.filter((selected) => selected !== permissionId),
        });
  }
};
