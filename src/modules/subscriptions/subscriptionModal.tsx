/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import { Edit } from "react-feather";
import { memberStore } from "../members/memberStore";
import { SubscriptionForm } from "./subscriptionAddForm";

type subscriptionModalProps = {
  type: "add" | "edit";
  id?: number;
};

export const SubscriptionModal: React.FC<subscriptionModalProps> = ({
  type,
  id,
}) => {
  const { selectedRole } = memberStore();
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" variant="button">
          Add Subscription
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <Edit size={24} />
        </Modal.Button>
      )}

      <Modal.Content width="3xl">
        <Modal.Title>
          {type === "edit" ? "Edit" : "Add"} {selectedRole.name} Subscription
        </Modal.Title>
        <SubscriptionForm type={type} />
      </Modal.Content>
    </Modal>
  );
};
