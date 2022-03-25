/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:07 PM
 *
 *
 */

import React from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/useModal";
import { Switch } from "@/components/Switch";

import { useRoleStore } from "@/modules/roles/useRoleStore";
import { addRole, updateRole } from "@/services/requests/roleRequests";

type RoleAddEditFormProps = {
  type: "add" | "edit";
  id: number | string;
};

type RoleValues = {
  title: string;
  memberLimit: number | string;
  isPublic: boolean;
  description: string;
};

export const RoleAddEditForm: React.FC<RoleAddEditFormProps> = ({ type, id }) => {
  const roles = useRoleStore((state) => state.roleList);
  const role = roles.filter((element) => element.id == id)[0];

  const { handleSubmit, register, control } = useForm<RoleValues>({
    defaultValues: role
      ? {
          title: role.name,
          description: role.desc,
          memberLimit: role.member_limit,
          isPublic: role.public,
        }
      : { title: "", description: "", memberLimit: "", isPublic: true },
  });

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (values) => {
        type === "add"
          ? await alert({
              promise: addRole({
                name: values.title,
                memberLimit: Number(values.memberLimit),
                isPublic: values.isPublic,
                description: values.description,
              }),
              msgs: {
                loading: "Adding New Role",
              },
              id: "role-add-toast",
            })
          : await alert({
              promise: updateRole({
                id: Number(id),
                name: values.title,
                memberLimit: Number(values.memberLimit),
                isPublic: values.isPublic,
                description: values.description,
              }),
              msgs: {
                loading: "Updating Role",
              },
              id: "role-edit-toast",
            });
      })}
    >
      <div className="space-y-6">
        <Input
          label="Title"
          data-testid="role-title-input"
          type="text"
          required={true}
          placeholder="Enter Role Title"
          {...register(`title`, { required: true })}
        />
        <Input
          label="Member Limit"
          data-testid="role-memberLimit-input"
          type="number"
          required={true}
          placeholder="Enter Role Member Limit"
          {...register("memberLimit", { required: true })}
        />

        <Switch name="isPublic" control={control} label="Public" />

        <Input
          data-testid="role-description-input"
          label="Description"
          type="text"
          required={true}
          placeholder="Enter Role Description"
          {...register("description", { required: true })}
        />
      </div>

      <Button data-testid="role-add-btn" size="lg">
        {type === "add" ? "Add" : "Edit"}
      </Button>
    </Modal.Form>
  );
};
