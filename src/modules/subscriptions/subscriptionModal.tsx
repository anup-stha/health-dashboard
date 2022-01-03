/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 12:52 AM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import { useMemberStore } from "../members/useMemberStore";
import React from "react";
import { SubscriptionForm } from "@/modules/subscriptions/subscriptionAddForm";
import { Button } from "@/components/Button";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";

type subscriptionModalProps = {
  type: "add" | "edit";
  id?: number;
};

export const SubscriptionModal: React.FC<subscriptionModalProps> = ({
  type,
  id,
}) => {
  const { selectedRole } = useMemberStore();
  const data: any = useSubscriptionStore
    .getState()
    .subscriptionList.list.filter((element) => element.id === id)[0];

  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open">
          <Button disabled={selectedRole.id === 0}> Add Subscription</Button>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <Button> &nbsp;&nbsp;Edit&nbsp;&nbsp; </Button>
        </Modal.Button>
      )}

      <Modal.Content width="3xl">
        <Modal.Title>
          {type === "edit" ? `Edit ${data.name}` : `Add ${selectedRole.name}`}{" "}
          Subscription
        </Modal.Title>

        <SubscriptionForm type={type} id={id} />
      </Modal.Content>
    </Modal>
  );
};
