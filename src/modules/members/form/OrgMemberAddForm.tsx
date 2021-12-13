/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 11:02 AM
 *
 *
 */

import { alert } from "@/components/Alert";
import { HookInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { addOrgMember } from "@/services/requests/memberRequests";
import { useForm } from "react-hook-form";
import { memberStore } from "../memberStore";

export const OrgMemberAddForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = memberStore.getState().selectedRole;

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
          label="Address"
          type="text"
          placeholder="Enter Address"
          {...register("address")}
        />
        <HookInput
          label="Phone"
          type="text"
          placeholder="Enter Phone"
          {...register("phone")}
        />
        <HookInput
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        <HookInput
          label="Password"
          type="password"
          placeholder="Enter Password"
          {...register("password")}
        />
      </div>
      <Modal.Button
        type="close"
        variant="button-submit"
        onClick={handleSubmit(async (data) => {
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
            id: "Login Toast",
          });
        })}
      >
        Add User
      </Modal.Button>
    </form>
  );
};
