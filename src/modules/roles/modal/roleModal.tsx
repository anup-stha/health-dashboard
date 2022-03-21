/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 3:35 PM
 *
 *
 */

import { Plus } from "phosphor-react";
import React from "react";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import { RoleAddEditForm } from "@/modules/roles/form/roleAddEditForm";

type RoleModalProps = {
  type: "add" | "edit";
  id?: number | string;
};

const RoleModal: React.FC<RoleModalProps> = ({ type, id }) => {
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" width="full">
          <div
            data-testid="role-modal-open-btn"
            className=" text-3xl font-medium text-primary-600 flex flex-col items-center justify-center overflow-hidden h-64 bg-transparent cursor-pointer border-dashed border-2 border-primary-600  shadow-inner rounded-lg"
          >
            <div className="flex flex-col items-center w-full">
              <Plus size={56} />
              <h1 className="">Add a Role</h1>
            </div>
          </div>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <Button color="secondary">&nbsp;&nbsp;Edit&nbsp;&nbsp; </Button>
        </Modal.Button>
      )}

      <Modal.Content title="Add Role">
        <Modal.Title>{type === "add" ? "Add" : "Edit"} A Role</Modal.Title>

        <RoleAddEditForm type={type} id={id ?? 0} />
      </Modal.Content>
    </Modal>
  );
};

export default RoleModal;
