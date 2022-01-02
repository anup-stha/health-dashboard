/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 6:31 PM
 *
 *
 */

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { MemberAddForm } from "../form/MemberAddForm";
import { UserAddForm } from "../form/UserAddForm";
import { Role, User } from "@/types";

interface MemberModalProps {
  type: "add" | "edit";
  orgId?: number | string;
  initialData?: User;
  button?: React.ReactNode;
  selectedRole: Role;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  type,
  initialData,
  button,
  selectedRole,
}) => {
  return (
    <Modal>
      <Modal.Button type="open">
        {type === "add" ? (
          <Button disabled={selectedRole.id === 0}>
            Add {selectedRole.id !== 0 && selectedRole.name} User
          </Button>
        ) : (
          button ?? (
            <div className="p-6 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
              Update Member Profile Details
            </div>
          )
        )}
      </Modal.Button>

      <Modal.Content>
        <Modal.Title>
          {type === "add" ? "Add" : "Edit"} {selectedRole && selectedRole.name}{" "}
          User
        </Modal.Title>
        <div className="flex flex-col space-y-4 ">
          {selectedRole &&
          selectedRole.permissions &&
          selectedRole.permissions.some(
            (element) => element.slug === "login"
          ) &&
          type === "add" ? (
            <UserAddForm />
          ) : (
            <MemberAddForm type={type} initialData={initialData} />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};
