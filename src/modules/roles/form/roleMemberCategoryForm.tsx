/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 4:48 PM
 *
 *
 */

import { PrimaryInput, SwitchInput } from "@/components/Input";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import {
  postMemberCategory,
  updateMemberCategory,
} from "@/services/requests/memberRequests";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/Modal/useModal";
import { alert } from "@/components/Alert";
import React from "react";
import { Button } from "@/components/Button";

type memberCategoryFormProps = {
  type: "add" | "edit";
  id: number;
};

export const RoleMemberCategoryForm: React.FC<memberCategoryFormProps> = ({
  type,
  id,
}) => {
  const { selectedRole, memberCategoryList } = useRoleStore();
  const categoryInitialData =
    id && memberCategoryList.filter((category) => category.id === id)[0];

  const { register, handleSubmit, reset } = useForm({
    defaultValues: categoryInitialData ? categoryInitialData : {},
  });
  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
        type === "add"
          ? await alert({
              promise: postMemberCategory({
                ...data,
                required: data.required ? 1 : 0,
                role_id: Number(selectedRole.id),
              }).then(() => reset()),
              msgs: {
                loading: "Adding Category",
                success: "Added Successfully",
              },
              id: "Member Category Toast",
            })
          : await alert({
              promise: updateMemberCategory(
                {
                  name: data.name,
                  value_type: data.value_type,
                  required: data.required ? 1 : 0,
                },
                id ?? 0
              ).then(() => reset()),
              msgs: {
                loading: "Updating Category",
                success: "Updated Successfully",
              },
              id: "Member Update Category Toast",
            });
      })}
    >
      <div className="space-y-4">
        <PrimaryInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />
        {type === "add" && (
          <PrimaryInput
            label="Slug"
            type="text"
            placeholder="Enter Slug"
            {...register("slug")}
          />
        )}

        <PrimaryInput
          label="Value Type"
          type="text"
          placeholder="Enter type of value"
          {...register("value_type")}
        />
        <SwitchInput
          label="Required"
          type="number"
          placeholder="Enter Required Field"
          {...register("required")}
        />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"} Category</Button>
    </Modal.Form>
  );
};
