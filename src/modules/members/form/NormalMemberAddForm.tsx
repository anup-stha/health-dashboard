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
      </div>
      <Modal.Button
        type="close"
        variant="button"
        onClick={handleSubmit(async (data) => {
          await alert({
            promise: addNormalMember({
              name: data.name,
              address: data.address,
              phone: data.phone,
              role_id: id,
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
