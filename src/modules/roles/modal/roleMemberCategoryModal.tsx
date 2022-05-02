/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Edit } from "react-feather";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import { RoleMemberCategoryForm } from "../form/roleMemberCategoryForm";

type memberCategoryModalProps = {
  type: "add" | "edit";
  id?: number;
};

export const RoleMemberCategoryModal: React.FC<memberCategoryModalProps> = ({ type, id }) => {
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open">
          <Button data-testid="category_modal">Add Category</Button>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <Edit size={24} />
        </Modal.Button>
      )}

      <Modal.Content width="max-w-2xl">
        <Modal.Title>{type === "edit" ? "Edit" : "Add"} Category</Modal.Title>
        <RoleMemberCategoryForm type={type} id={id ? id : 0} />
      </Modal.Content>
    </Modal>
  );
};
