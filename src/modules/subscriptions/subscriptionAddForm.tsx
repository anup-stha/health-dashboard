/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 4:59 PM
 *
 *
 */

import { PrimaryInput } from "@/components/Input";

import { useForm } from "react-hook-form";
import { Modal } from "@/components/Modal/useModal";
import { memberStore } from "../members/memberStore";
import { alert } from "@/components/Alert";
import { addSubscription } from "@/services/requests/subscriptionRequests";
import { Button } from "@/components/Button";

type memberCategoryFormProps = {
  type: "add" | "edit";
  id?: number;
};

export const SubscriptionForm: React.FC<memberCategoryFormProps> = ({
  type,
}) => {
  const { selectedRole } = memberStore();

  const { register, handleSubmit } = useForm();
  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
        type === "add"
          ? await alert({
              promise: addSubscription({
                role_id: Number(selectedRole.id),
                name: data.name,
                price: Number(data.price),

                interval_type: Number(data.interval_type),
                interval_value: Number(data.interval_value),
                grace_period: Number(data.grace_period),
                sync_limit: Number(data.sync_limit),
              }),
              msgs: {
                loading: "Adding Subscription",
              },
              id: "subscription-add",
            })
          : null;
      })}
    >
      <div className="space-y-4">
        <PrimaryInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />
        <PrimaryInput
          label="Price"
          type="number"
          placeholder="Enter Price"
          {...register("price")}
        />

        <div className="flex space-x-4">
          <div className="w-1/2">
            <PrimaryInput
              label="Interval Type"
              type="text"
              min="0"
              placeholder="Enter Interval Type"
              {...register("interval_type")}
            />
          </div>
          <div className="w-1/2">
            <PrimaryInput
              label="Interval Value"
              type="number"
              min="0"
              placeholder="Enter Interval Value"
              {...register("interval_value")}
            />
          </div>
        </div>

        <PrimaryInput
          label="Grace Period"
          type="number"
          min="0"
          placeholder="Enter Grace Period"
          {...register("grace_period")}
        />
        <PrimaryInput
          label="Sync Limit"
          type="number"
          placeholder="Enter Sync Limit"
          min="0"
          {...register("sync_limit")}
        />
      </div>

      <Button>Add Subscription</Button>
    </Modal.Form>
  );
};
