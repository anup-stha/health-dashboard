/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MemberAddEditForm } from "@/modules/members/components/form/MemberAddEditForm";
import { PatientAddForm } from "@/modules/members/components/form/PatientAddForm";
import { UserAddForm } from "@/modules/members/components/form/UserAddForm";
import { Member } from "@/modules/members/types";

import { Role } from "@/types";

interface MemberModalProps {
  type: "add" | "edit";
  orgId?: number | string;
  initialData?: Member;
  button?: React.ReactNode;
  selectedRole: Role;
  parent_member_id?: number;
}

/**
 *
 * @param {"add" | "edit"} type
 * @param {Member} initialData
 * @param {React.ReactNode} button
 * @param {Role} selectedRole
 * @param {number} parent_member_id
 * @return {JSX.Element}
 */
export function MemberModal({ type, initialData, button, selectedRole, parent_member_id }: MemberModalProps) {
  const currentUser = useAuthStore((state) => state.user);

  const { address, ...rest } = initialData || {};

  const street_address = address?.split(" - ")[1] ?? address;
  const other_address = address?.split(" - ")[0];

  const { register, handleSubmit, control, reset, watch, unregister, resetField, setValue } = useForm({
    defaultValues: {
      ...rest,
      dob_ad: moment(Number(initialData?.dob_ad) * 1000).format("YYYY-MM-DD"),
      address: street_address,
      city: other_address?.split(", ")[0],
      district: other_address?.split(", ")[1],
      province: other_address?.split(", ")[2],
    },
  });

  useEffect(() => {
    unregister();
  }, [selectedRole.id]);

  const getIfPermitted = () => {
    if (currentUser?.id === 1 || type === "edit") {
      return true;
    } else if (selectedRole.slug === "patient") {
      return currentUser?.role.permissions.some((permission) => permission.slug === "create_patient");
    } else if (selectedRole.slug === "org_operator") {
      return currentUser?.role.permissions.some((permission) => permission.slug === "create_operator");
    } else if (currentUser?.role.slug === "school_admin") {
      return true;
    }
    return false;
  };

  return (
    <Modal>
      <Modal.Button type="open" disabled={selectedRole.id === 0 || !getIfPermitted()}>
        {type === "add" ? (
          <Button
            onClick={() => {
              !getIfPermitted() &&
                toast.error("You don't have the permission to add. Please contact Sunya Health", {
                  duration: 4000,
                  id: "permission-error",
                });
            }}
            data-testid={`${type}-modal-open-btn`}
          >
            Add {selectedRole.id !== 0 && selectedRole.name} User
          </Button>
        ) : (
          button ?? (
            <div className="p-6 text-gray-500 text-xl font-medium cursor-pointer hover:text-gray-850 hover:text-gray-800">
              Update Profile Details
            </div>
          )
        )}
      </Modal.Button>

      <Modal.Content
        width="max-w-4xl"
        onModalClose={() => {
          reset();
        }}
      >
        <Modal.Title>
          {type === "add" ? "Add" : "Edit"} {selectedRole && selectedRole.name} User
        </Modal.Title>
        <div className="flex flex-col space-y-4 ">
          {selectedRole && selectedRole.slug === "patient" && type === "add" ? (
            <PatientAddForm
              selectedRole={selectedRole}
              handleSubmit={handleSubmit}
              setValue={setValue}
              parent_member_id={parent_member_id}
              control={control}
              register={register}
              reset={reset}
              resetField={resetField}
              watch={watch}
            />
          ) : selectedRole &&
            selectedRole.permissions &&
            selectedRole.permissions.some((element) => element.slug === "login") &&
            type === "add" ? (
            <UserAddForm
              setValue={setValue}
              handleSubmit={handleSubmit}
              control={control}
              register={register}
              reset={reset}
              watch={watch}
              resetField={resetField}
              selectedRole={selectedRole}
              parent_member_id={parent_member_id}
            />
          ) : (
            <MemberAddEditForm
              type={type}
              setValue={setValue}
              selectedRole={selectedRole}
              initialData={initialData}
              handleSubmit={handleSubmit}
              control={control}
              register={register}
              reset={reset}
              watch={watch}
              resetField={resetField}
            />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
}
