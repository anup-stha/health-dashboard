/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 12:52 AM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import { Edit } from "react-feather";
import { memberStore } from "../members/memberStore";
import React from "react";
import { SubscriptionForm } from "@/modules/subscriptions/subscriptionAddForm";
import { Button } from "@/components/Button";

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
        <Modal.Button type="open">
          <Button disabled={selectedRole.id === 0}> Add Subscription</Button>
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
