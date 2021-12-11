/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { HookInput } from "@/components/Input";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import {
  postMemberCategory,
  updateMemberCategory,
} from "@/services/requests/memberRequests";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/Modal/useModal";

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
    <form className="space-y-8">
      <div className="space-y-4">
        <HookInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />
        <HookInput
          label="Slug"
          type="text"
          placeholder="Enter Slug"
          {...register("slug")}
        />

        <HookInput
          label="Value Type"
          type="text"
          placeholder="Enter type of value"
          {...register("value_type")}
        />
        <HookInput
          label="Required"
          type="number"
          placeholder="Enter Required Field"
          {...register("required")}
        />
      </div>

      <Modal.Button
        type="close"
        variant="button"
        onClick={handleSubmit(async (data) => {
          type === "add"
            ? await alert({
                promise: postMemberCategory({
                  ...data,
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
                    required: data.required,
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
        Add Category
      </Modal.Button>
    </form>
  );
};
