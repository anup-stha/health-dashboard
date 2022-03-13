/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:16 PM
 *
 *
 */

import Image from "next/image";
import React from "react";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import {
  addPermissionToRole,
  removePermissionFromRole,
} from "@/services/requests/roleRequests";

import { useRoleStore } from "../../roles/useRoleStore";

type PermissionSaveModalPropType = Record<string, any>;

const PermissionSaveModal: React.FC<PermissionSaveModalPropType> = () => {
  const { selectedPermission, selectedRole } = useRoleStore();
  return (
    <Modal>
      <Modal.Button type="open">
        <Button
          disabled={
            selectedPermission.deselected.length === 0 &&
            selectedPermission.selected.length === 0
          }
        >
          Save Permissions
        </Button>
      </Modal.Button>
      <Modal.Content width="max-w-6xl">
        <div className="space-y-2">
          <Modal.Title>Save Permission</Modal.Title>
          <p className="text-xl font-medium text-primary_gray-500">
            You are about to save the following permissions
          </p>
        </div>
        <Modal.Scrollable>
          <div className="flex flex-col space-y-8">
            {selectedPermission.selected.length !== 0 && (
              <div>
                <div className="font-medium text-primary_gray-600 text-xl mb-2">
                  Added Permissions
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                  {selectedPermission.selected.map((permissionId) => {
                    const permissionDetail = selectedPermission.all.filter(
                      (element) => element.id === permissionId
                    )[0];

                    return (
                      <div
                        className="flex items-center h-full space-x-4  p-4 shadow-E500 rounded-sm"
                        key={permissionId}
                      >
                        <div>
                          <Image
                            src="/assets/permission1.png"
                            alt={permissionDetail.name}
                            width={64}
                            height={64}
                            objectFit="cover"
                            layout="fixed"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-2xl text-primary_gray-850 font-medium line-clamp-1">
                            {permissionDetail.name}
                          </span>
                          <span className="text-base text-primary_gray-500 font-medium w-4/5 line-clamp-3">
                            {permissionDetail.slug}
                          </span>
                          <span className="text-base text-primary_gray-500 font-medium w-4/5 line-clamp-3">
                            {permissionDetail.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {selectedPermission.deselected.length !== 0 && (
              <div>
                <div className="font-medium text-red-600 text-xl mb-2">
                  Removed Permissions
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                  {selectedPermission.deselected.map((permissionId) => {
                    const permissionDetail = selectedPermission.all.filter(
                      (element) => element.id === permissionId
                    )[0];

                    return (
                      <div
                        className="flex items-center h-full space-x-4 p-4 shadow-E500 rounded-sm ring-red-700 ring-opacity-75 ring-2"
                        key={permissionId}
                      >
                        <div>
                          <Image
                            src="/assets/permission1.png"
                            alt={permissionDetail.name}
                            width={64}
                            height={64}
                            objectFit="cover"
                            layout="fixed"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-2xl text-primary_gray-850 font-medium line-clamp-1">
                            {permissionDetail.name}
                          </span>
                          <span className="text-base text-primary_gray-500 font-medium w-4/5 line-clamp-3">
                            {permissionDetail.slug}
                          </span>
                          <span className="text-base text-primary_gray-500 font-medium w-4/5 line-clamp-3">
                            {permissionDetail.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              <Modal.Button
                type="close"
                async={true}
                onClick={async () => {
                  await selectedPermission.deselected.map((id) =>
                    alert({
                      promise: removePermissionFromRole(selectedRole.id, id),
                      msgs: {
                        loading: "Saving Permission",
                        success: "Saved Permission",
                      },
                      id: "Permission",
                    })
                  );
                  selectedPermission.selected.length !== 0 &&
                    (await alert({
                      promise: addPermissionToRole(
                        Number(selectedRole.id),
                        selectedPermission.selected
                      ),
                      msgs: {
                        loading: "Saving Permission",
                        success: "Saved Permission",
                      },
                      id: "Permission",
                    }));
                }}
              >
                Save Permissions
              </Modal.Button>
            </div>
          </div>
        </Modal.Scrollable>
      </Modal.Content>
    </Modal>
  );
};

export default PermissionSaveModal;
