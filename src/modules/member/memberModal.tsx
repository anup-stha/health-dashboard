import React, { Fragment } from "react";

// import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";

import { OrganisationIntialFormDataType } from "@/modules/member";
import { Modal } from "@/components/Modal/useModal";
import { useForm } from "react-hook-form";
import { HookInput } from "@/components/Input";
import { alert } from "@/components/Alert";
import { postOrganisationMember } from "@/services/requests/memberRequests";
import { memberStore } from "./memberStore";
import { Edit } from "react-feather";

interface MemberModalProps {
  type: "add" | "update";
  initialValues?: OrganisationIntialFormDataType;
  orgId?: number | string;
}

export const MemberModal: React.FC<MemberModalProps> = ({ type }) => {
  const { register, handleSubmit, reset } = useForm();
  const { id, name } = memberStore.getState().selectedRole;

  return (
    <>
      <Modal>
        <Modal.Button type="open">
          {type === "add" ? (
            <Button>Add {name} User</Button>
          ) : (
            <Edit
              name="edit"
              className="text-gray-400 cursor-pointer hover:text-gray-800"
            />
          )}
        </Modal.Button>

        <Modal.Content>
          <Modal.Title>Add Organisation User</Modal.Title>
          <form className="space-y-8">
            <div className="space-y-4">
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
                console.log(data);
                await alert({
                  promise: postOrganisationMember({
                    name: data.name,
                    address: data.address,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    role_id: id,
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
        </Modal.Content>
      </Modal>
    </>
  );
};

export {};
