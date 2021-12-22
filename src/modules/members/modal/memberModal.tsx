/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { Edit } from "react-feather";
import { NormalMemberAddForm } from "../form/NormalMemberAddForm";
import { OrgMemberAddForm } from "../form/OrgMemberAddForm";
import { memberStore } from "../memberStore";

interface MemberModalProps {
  type: "add" | "update";
  orgId?: number | string;
}

export const MemberModal: React.FC<MemberModalProps> = ({ type }) => {
  const { id, name, permissions } = memberStore.getState().selectedRole;

  return (
    <>
      <Modal>
        <Modal.Button type="open">
          {type === "add" ? (
            <Button disabled={id === 0}>Add {id !== 0 && name} User</Button>
          ) : (
            <Edit
              name="edit"
              className="text-gray-400 cursor-pointer hover:text-gray-800"
            />
          )}
        </Modal.Button>

        <Modal.Content>
          <Modal.Title>Add {name} User</Modal.Title>
          <div className="flex flex-col space-y-4 ">
            {permissions &&
            permissions.some((element) => element.name === "Login") ? (
              <OrgMemberAddForm />
            ) : (
              <NormalMemberAddForm />
            )}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
