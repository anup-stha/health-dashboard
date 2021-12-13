/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 4:48 PM
 *
 *
 */

import { alert } from "@/components/Alert";
import { PrimaryInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { addOrgMember } from "@/services/requests/memberRequests";
import { useForm } from "react-hook-form";
import { memberStore } from "../memberStore";
import { Button } from "@/components/Button";

export const OrgMemberAddForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = memberStore.getState().selectedRole;

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
        await alert({
          promise: addOrgMember({
            name: data.name,
            address: data.address,
            email: data.email,
            password: data.password,
            phone: data.phone,
            role_id: Number(id),
          }).then(() => reset()),
          msgs: {
            loading: "Adding Member",
            success: "Added Successfully",
          },
          id: "org-member-toast",
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
          {...register("address")}
        />
        <PrimaryInput
          label="Phone"
          type="text"
          placeholder="Enter Phone"
          {...register("phone")}
        />
        <PrimaryInput
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        <PrimaryInput
          label="Password"
          type="password"
          placeholder="Enter Password"
          {...register("password")}
        />
      </div>
      <Button>Add Organization User</Button>
    </Modal.Form>
  );
};
