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
import { PrimaryInput, SwitchInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";

import { useRoleStore } from "@/modules/roles/useRoleStore";
import { addRole, updateRole } from "@/services/requests/roleRequests";

type RoleAddEditFormProps = {
  type: "add" | "edit";
  id: number | string;
};

type RoleValues = {
  title: string;
  memberLimit: number;
  public: boolean;
  description: string;
};

export const RoleAddEditForm: React.FC<RoleAddEditFormProps> = ({ type, id }) => {
  const roles = useRoleStore((state) => state.allRoleList.data);
  const role = roles.filter((element) => element.id == id)[0];

  const { handleSubmit, register } = useForm<RoleValues>({
    defaultValues: role
      ? {
          title: role.name,
          description: role.desc,
          memberLimit: role.member_limit,
          public: role.public,
        }
      : { title: "", description: "", memberLimit: 0, public: true },
  });

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (values) => {
        type === "add"
          ? await alert({
              promise: addRole({
                name: values.title,
                memberLimit: Number(values.memberLimit),
                isPublic: values.public,
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
                isPublic: values.public,
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
        <PrimaryInput label="Title" type="text" required={true} placeholder="Enter Role Title" {...register(`title`)} />
        <div className="flex items-end space-x-4">
          <PrimaryInput
            label="Member Limit"
            type="number"
            required={true}
            placeholder="Enter Role Member Field"
            {...register("memberLimit")}
          />
        </div>
        <SwitchInput label="Public" type="checkbox" placeholder="Enter Public" {...register("public")} />
        <PrimaryInput
          label="Description"
          type="text"
          required={true}
          placeholder="Enter Role Description"
          {...register("description")}
        />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"}</Button>
    </Modal.Form>
  );
};
