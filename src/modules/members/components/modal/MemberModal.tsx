/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 10:47 AM
 *
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
export function MemberModal({
  type,
  initialData,
  button,
  selectedRole,
  parent_member_id,
}: MemberModalProps) {
  const currentUser = useAuthStore((state) => state.user);
  const { register, handleSubmit, control, reset, watch, unregister } = useForm(
    {
      defaultValues: {
        ...initialData,
        dob_ad: moment(Number(initialData?.dob_ad) * 1000).format("YYYY-MM-DD"),
      },
    }
  );

  useEffect(() => {
    unregister();
  }, [selectedRole.id]);

  const getIfPermitted = () => {
    if (currentUser.id === 1 || type === "edit") {
      return true;
    } else if (selectedRole.slug === "patient") {
      return currentUser.role.permissions.some(
        (permission) => permission.slug === "create_patient"
      );
    } else if (selectedRole.slug === "org_operator") {
      return currentUser.role.permissions.some(
        (permission) => permission.slug === "create_operator"
      );
    }
    return false;
  };

  return (
    <Modal>
      <Modal.Button
        type="open"
        disabled={selectedRole.id === 0 || !getIfPermitted()}
      >
        {type === "add" ? (
          <Button
            onClick={() => {
              !getIfPermitted() &&
                toast.error(
                  "You don't have the permission to add. Please contact Sunya Health",
                  {
                    duration: 4000,
                    id: "permission-error",
                  }
                );
            }}
            data-testid={`${type}-modal-open-btn`}
          >
            Add {selectedRole.id !== 0 && selectedRole.name} User
          </Button>
        ) : (
          button ?? (
            <div className="p-6 text-primary_gray-500 text-xl font-medium cursor-pointer hover:text-primary_gray-850 hover:text-primary_gray-800">
              Update Profile Details
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
              selectedRole={selectedRole}
              handleSubmit={handleSubmit}
              parent_member_id={parent_member_id}
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
              selectedRole={selectedRole}
              parent_member_id={parent_member_id}
            />
          ) : (
            <MemberAddEditForm
              type={type}
              selectedRole={selectedRole}
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
}
