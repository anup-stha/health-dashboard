/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 11:01 AM
 *
 *
 */

import React from "react";
import { Modal } from "@/components/Modal/useModal";
import { useForm } from "react-hook-form";
import { HookInput } from "@/components/Input";
import { alert } from "@/components/Alert";
import { addNormalMember } from "@/services/requests/memberRequests";
import { memberStore } from "../memberStore";

export const NormalMemberAddForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = memberStore.getState().selectedRole;

  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <HookInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          required={true}
          {...register("name")}
        />
        <HookInput
          label="Address"
          type="text"
          placeholder="Enter Address"
          required={true}
          {...register("address")}
        />
        <HookInput
          label="Phone"
          type="text"
          placeholder="Enter Phone"
          {...register("phone")}
        />
      </div>
      <Modal.Button
        type="close"
        variant="button-submit"
        onClick={handleSubmit(async (data) => {
          await alert({
            promise: addNormalMember({
              name: data.name,
              address: data.address,
              phone: data.phone,
              role_id: Number(id),
            }).then(() => reset()),
            msgs: {
              loading: "Adding Member",
              success: "Added Successfully",
            },
            id: "Member Add Toast",
          });
        })}
      >
        Add User
      </Modal.Button>
    </form>
  );
};
