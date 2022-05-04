/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import React from "react";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { SubscriptionForm } from "@/modules/subscriptions/subscriptionAddForm";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";

type subscriptionModalProps = {
  type: "add" | "edit";
  id?: number;
};

export const SubscriptionModal: React.FC<subscriptionModalProps> = ({ type, id }) => {
  const { role: selectedRole } = useCurrentMemberStore();
  const data: any = useSubscriptionStore.getState().subscriptionList.list.filter((element) => element.id === id)[0];

  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open">
          <Button disabled={selectedRole.id === 0} data-testid="subs_modal_open_btn">
            Add Subscription
          </Button>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <Button> &nbsp;&nbsp;Edit&nbsp;&nbsp; </Button>
        </Modal.Button>
      )}

      <Modal.Content width="max-w-3xl">
        <Modal.Title>{type === "edit" ? `Edit ${data.name}` : `Add ${selectedRole.name}`} Subscription</Modal.Title>

        <SubscriptionForm type={type} id={id} />
      </Modal.Content>
    </Modal>
  );
};
