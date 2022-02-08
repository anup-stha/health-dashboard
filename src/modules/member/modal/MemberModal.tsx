/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/8/22, 12:41 PM
 *
 *
 */

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import React, { useEffect } from "react";
import { Role } from "@/types";
import { useForm } from "react-hook-form";
import { PatientAddForm } from "@/modules/member/form/PatientAddForm";
import { UserAddForm } from "@/modules/member/form/UserAddForm";
import { MemberAddEditForm } from "@/modules/member/form/MemberAddEditForm";
import { Member } from "@/modules/member/types";
import moment from "moment";
import toast from "react-hot-toast";
import { useAuthStore } from "@/modules/auth/useTokenStore";

interface MemberModalProps {
  type: "add" | "edit";
  orgId?: number | string;
  initialData?: Member;
  button?: React.ReactNode;
  selectedRole: Role;
  parent_member_id?: number;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  type,
  initialData,
  button,
  selectedRole,
  parent_member_id,
}) => {
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
    if (currentUser.id === 1) {
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
            <div className="p-6 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
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
};
