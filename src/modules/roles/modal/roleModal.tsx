/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 3:35 PM
 *
 *
 */

import { InfoButton } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import { Plus } from "phosphor-react";
import * as Yup from "yup";
import { RoleAddEditForm } from "@/modules/roles/form/roleAddEditForm";
import React from "react";

type RoleModalProps = {
  type: "add" | "edit";
  id?: number | string;
};

export const RoleSchema = Yup.object().shape({
  description: Yup.string().max(92, "Too long, Maximum 92 Characters"),
});

const RoleModal: React.FC<RoleModalProps> = ({ type, id }) => {
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" width="full">
          <div className=" text-3xl font-semibold text-green-600 flex flex-col items-center justify-center overflow-hidden h-64 bg-transparent cursor-pointer border-dashed border-2 border-green-600  shadow-inner rounded-lg">
            <div className="flex flex-col items-center w-full">
              <Plus size={56} />
              <h1 className="">Add a Role</h1>
            </div>
          </div>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <InfoButton>&nbsp;&nbsp;Edit&nbsp;&nbsp; </InfoButton>
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
