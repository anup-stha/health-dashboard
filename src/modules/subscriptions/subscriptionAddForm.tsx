/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { HookInput } from "@/components/Input";

import { useForm } from "react-hook-form";
import { Modal } from "@/components/Modal/useModal";
import { memberStore } from "../members/memberStore";
import { alert } from "@/components/Alert";
import { addSubscription } from "@/services/requests/subscriptionRequests";

type memberCategoryFormProps = {
  type: "add" | "edit";
  id?: number;
};

export const SubscriptionForm: React.FC<memberCategoryFormProps> = ({
  type,
  id,
}) => {
  const { selectedRole } = memberStore();

  const { register, handleSubmit } = useForm();
  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <HookInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />
        <HookInput
          label="Price"
          type="number"
          placeholder="Enter Price"
          {...register("price")}
        />

        <div className="flex space-x-4">
          <div className="w-1/2">
            <HookInput
              label="Interval Type"
              type="text"
              placeholder="Enter Interval Type"
              {...register("interval_type")}
            />
          </div>
          <div className="w-1/2">
            <HookInput
              label="Interval Value"
              type="number"
              placeholder="Enter Interval Value"
              {...register("interval_value")}
            />
          </div>
        </div>

        <HookInput
          label="Grace Period"
          type="text"
          placeholder="Enter Grace Period"
          {...register("grace_period")}
        />
        <HookInput
          label="Sync Limit"
          type="number"
          placeholder="Enter Sync Limit"
          {...register("sync_limit")}
        />
      </div>

      <Modal.Button
        type="close"
        variant="button"
        onClick={handleSubmit(async (data) => {
          type === "add"
            ? await alert({
                promise: addSubscription({
                  role_id: selectedRole.id,
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
        Add Subscription
      </Modal.Button>
    </form>
  );
};
