/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */
import React from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useGlobalState } from "@/modules/useGlobalState";
import { addSubscription, updateSubscription } from "@/services/requests/subscriptionRequests";

type memberCategoryFormProps = {
  type: "add" | "edit";
  id?: number;
};

type SubscriptionFormData = {
  name: string | undefined;
  price: number | undefined;
  test_limit: number | undefined;
  interval_type: string | undefined;
  interval_value: number | undefined;
  grace_period: number | undefined;
  sync_limit: number | undefined;
};

export const SubscriptionForm: React.FC<memberCategoryFormProps> = ({ type, id }) => {
  const selectedRole = useCurrentMemberStore((state) => state.role);

  const { subscriptionList } = useSubscriptionStore();
  const data: any = subscriptionList.list.filter((element) => element.id === id)[0];

  const { register, handleSubmit, control } = useForm<SubscriptionFormData>({
    defaultValues:
      type === "add"
        ? {
            name: undefined,
            price: undefined,
            test_limit: undefined,
            interval_type: undefined,
            interval_value: undefined,
            grace_period: undefined,
            sync_limit: undefined,
          }
        : {
            name: data.name,
            price: data.price.replace(/[^\d.]*/g, ""),
            test_limit: Number(data.test_limit),
            interval_type: data.interval_type,
            interval_value: Number(data.interval_value),
            grace_period: Number(data.grace_period),
            sync_limit: Number(data.sync_limit),
          },
  });

  const options = useGlobalState.getState().base.subscription_intervals.map((element) => ({
    value: element,
    label: element,
  }));

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
        type === "add"
          ? await alert({
              promise: addSubscription({
                role_id: Number(selectedRole.id),
                name: String(data.name),
                price: Number(data.price),
                test_limit: Number(data.test_limit),
                interval_type: String(data.interval_type),
                interval_value: Number(data.interval_value),
                grace_period: Number(data.grace_period),
                sync_limit: Number(data.sync_limit),
              }),
              msgs: {
                loading: "Adding Subscription",
              },
              id: "subscription-add",
            })
          : await alert({
              promise: updateSubscription(
                {
                  name: String(data.name),
                  price: Number(data.price),
                  test_limit: Number(data.test_limit),
                  interval_type: String(data.interval_type),
                  interval_value: Number(data.interval_value),
                  grace_period: Number(data.grace_period),
                  sync_limit: Number(data.sync_limit),
                },
                Number(id)
              ),
              msgs: {
                loading: "Updating Subscription",
              },
              id: "subscription-add",
            });
      })}
    >
      <div className="space-y-4">
        <Input
          data-testid="subs_input_name"
          label="Name"
          type="text"
          placeholder="Enter Name"
          required={true}
          {...register("name", { required: true })}
        />
        <Input
          data-testid="subs_input_price"
          label="Price"
          placeholder="Enter Price"
          required={true}
          {...register("price", { required: true })}
        />

        <div className="flex space-x-4">
          <div className="w-1/2">
            <DropdownController options={options} name="interval_type" label="Interval Type" control={control} />
          </div>
          <div className="w-1/2">
            <Input
              data-testid="subs_input_intervalValue"
              label="Interval Value"
              type="number"
              min="0"
              required={true}
              placeholder="Enter Interval Value"
              {...register("interval_value", { required: true })}
            />
          </div>
        </div>

        <Input
          data-testid="subs_input_gracePeriod"
          label="Grace Period"
          type="number"
          min="0"
          required={true}
          placeholder="Enter Grace Period"
          {...register("grace_period", { required: true })}
        />
        <div className="flex space-x-4">
          <div className="w-1/2">
            <Input
              data-testid="subs_input_syncLimit"
              label="Sync Limit"
              type="number"
              placeholder="Enter Sync Limit"
              min="0"
              required={true}
              {...register("sync_limit", { required: true })}
            />
          </div>
          <div className="w-1/2">
            <Input
              data-testid="subs_input_testLimit"
              label="Test Limit"
              type="number"
              placeholder="Enter Test Limit"
              min="0"
              required={true}
              {...register("test_limit", { required: true })}
            />
          </div>
        </div>
      </div>

      <Button data-testid="subs-add-btn">{type === "add" ? "Add" : "Edit"} Subscription</Button>
    </Modal.Form>
  );
};
