/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 12:07 PM
 *
 *
 */

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { Edit } from "react-feather";
import { MemberAddForm } from "../form/MemberAddForm";
import { UserAddForm } from "../form/UserAddForm";
import { memberStore } from "../memberStore";

interface MemberModalProps {
  type: "add" | "update";
  orgId?: number | string;
}

export const MemberModal: React.FC<MemberModalProps> = ({ type }) => {
  const { selectedRole } = memberStore();
  return (
    <>
      <Modal>
        <Modal.Button type="open">
          {type === "add" ? (
            <Button disabled={selectedRole.id === 0}>
              Add {selectedRole.id !== 0 && selectedRole.name} User
            </Button>
          ) : (
            <Edit
              name="edit"
              className="text-gray-400 cursor-pointer hover:text-gray-800"
            />
          )}
        </Modal.Button>

        <Modal.Content>
          <Modal.Title>Add {selectedRole.name} User</Modal.Title>
          <div className="flex flex-col space-y-4 ">
            {selectedRole.permissions &&
            selectedRole.permissions.some(
              (element) => element.slug === "login"
            ) ? (
              <UserAddForm />
            ) : (
              <MemberAddForm />
            )}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
