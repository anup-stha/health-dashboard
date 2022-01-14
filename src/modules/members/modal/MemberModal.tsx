/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 12:19 PM
 *
 *
 */

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { MemberAddForm } from "../form/MemberAddForm";
import { UserAddForm } from "../form/UserAddForm";
import { Role, User } from "@/types";
import { useForm } from "react-hook-form";
import { PatientAddForm } from "@/modules/members/form/PatientAddForm";

interface MemberModalProps {
  type: "add" | "edit";
  orgId?: number | string;
  initialData?: User;
  button?: React.ReactNode;
  selectedRole: Role;
}

/* interface _UserAddFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  dob_ad: number;
  dob_bs: number;
  gender: "Male" | "Female" | "Others";
  marital_status: "Single" | "Married";
} */

export const MemberModal: React.FC<MemberModalProps> = ({
  type,
  initialData,
  button,
  selectedRole,
}) => {
  const { register, handleSubmit, control, reset, watch } = useForm();

  return (
    <Modal>
      <Modal.Button type="open" disabled={selectedRole.id === 0}>
        {type === "add" ? (
          <Button
            disabled={selectedRole.id === 0}
            data-testid={`${type}-member-btn`}
          >
            Add {selectedRole.id !== 0 && selectedRole.name} User
          </Button>
        ) : (
          button ?? (
            <div className="p-6 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
              Update Member Profile Details
            </div>
          )
        )}
      </Modal.Button>

      <Modal.Content>
        <Modal.Title>
          {type === "add" ? "Add" : "Edit"} {selectedRole && selectedRole.name}{" "}
          User
        </Modal.Title>
        <div className="flex flex-col space-y-4 ">
          {selectedRole && selectedRole.slug === "patient" && type === "add" ? (
            <PatientAddForm
              handleSubmit={handleSubmit}
              control={control}
              register={register}
              reset={reset}
              watch={watch}
            />
          ) : selectedRole &&
            selectedRole.permissions &&
            selectedRole.permissions.some(
              (element) => element.slug === "login"
            ) &&
            type === "add" ? (
            <UserAddForm
              handleSubmit={handleSubmit}
              control={control}
              register={register}
              reset={reset}
              watch={watch}
            />
          ) : (
            <MemberAddForm type={type} initialData={initialData} />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};
