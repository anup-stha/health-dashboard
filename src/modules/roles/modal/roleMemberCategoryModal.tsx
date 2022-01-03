/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 11:13 AM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import { Edit } from "react-feather";
import { RoleMemberCategoryForm } from "../form/roleMemberCategoryForm";
import { Button } from "@/components/Button";

type memberCategoryModalProps = {
  type: "add" | "edit";
  id?: number;
};

export const RoleMemberCategoryModal: React.FC<memberCategoryModalProps> = ({
  type,
  id,
}) => {
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open">
          <Button>Add Category</Button>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <Edit size={24} />
        </Modal.Button>
      )}

      <Modal.Content width="2xl">
        <Modal.Title>{type === "edit" ? "Edit" : "Add"} Category</Modal.Title>
        <RoleMemberCategoryForm type={type} id={id ? id : 0} />
      </Modal.Content>
    </Modal>
  );
};
