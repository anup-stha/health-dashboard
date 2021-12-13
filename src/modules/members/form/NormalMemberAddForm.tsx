/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 4:48 PM
 *
 *
 */

import React from "react";
import { Modal } from "@/components/Modal/useModal";
import { useForm } from "react-hook-form";
import { memberStore } from "../memberStore";
import { addNormalMember } from "@/services/requests/memberRequests";
import { PrimaryInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { alert } from "@/components/Alert";

export const NormalMemberAddForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = memberStore.getState().selectedRole;

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
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
      <div className="space-y-4">
        <PrimaryInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          required={true}
          {...register("name")}
        />
        <PrimaryInput
          label="Address"
          type="text"
          placeholder="Enter Address"
          required={true}
          {...register("address")}
        />
        <PrimaryInput
          label="Phone"
          type="text"
          placeholder="Enter Phone"
          {...register("phone")}
        />
      </div>
      <Button>Add User</Button>
    </Modal.Form>
  );
};
