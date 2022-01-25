/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 6:06 PM
 *
 *
 */

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { Role } from "@/types";
import { useForm } from "react-hook-form";
import { PatientAddForm } from "@/modules/member/form/PatientAddForm";
import { UserAddForm } from "@/modules/member/form/UserAddForm";
import { MemberAddEditForm } from "@/modules/member/form/MemberAddEditForm";
import { Member } from "@/modules/member/types";
import moment from "moment";

interface MemberModalProps {
  type: "add" | "edit";
  orgId?: number | string;
  initialData?: Member;
  button?: React.ReactNode;
  selectedRole: Role;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  type,
  initialData,
  button,
  selectedRole,
}) => {
  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      ...initialData,
      dob_ad: moment(Number(initialData?.dob_ad) * 1000).format("YYYY-MM-DD"),
    },
  });

  return (
    <Modal>
      <Modal.Button type="open" disabled={selectedRole.id === 0}>
        {type === "add" ? (
          <Button
            disabled={selectedRole.id === 0}
            data-testid={`${type}-modal-open-btn`}
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
            <MemberAddEditForm
              type={type}
              initialData={initialData}
              handleSubmit={handleSubmit}
              control={control}
              register={register}
              reset={reset}
              watch={watch}
            />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};
