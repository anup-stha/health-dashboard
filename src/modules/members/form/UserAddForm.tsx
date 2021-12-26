/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/26/21, 3:39 PM
 *
 *
 */

import { PrimaryInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { useForm } from "react-hook-form";
import { memberStore } from "../memberStore";
import { Button } from "@/components/Button";
import moment from "moment";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { addOrgMember } from "@/services/requests/memberRequests";
import { alert } from "@/components/Alert";
import React from "react";

interface UserAddFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  dob_ad: number;
  dob_bs: number;
  gender: "Male" | "Female" | "Others";
  marital_status: "Single" | "Married";
}

type UserAddFormProps = {
  type?: "edit" | "add";
};

export const UserAddForm: React.FC<UserAddFormProps> = ({ type = "add" }) => {
  const { register, handleSubmit, control } = useForm<UserAddFormData>();
  const { selectedRole } = memberStore();

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
        await alert({
          promise: addOrgMember({
            ...data,
            dob_ad: moment(data.dob_ad).unix(),
            role_id: Number(selectedRole.id),
          }),
          msgs: {
            loading: "Adding User",
            success: "Added Successfully",
          },
          id: "user-add-toast",
        });
      })}
    >
      <div className="space-y-4">
        <PrimaryInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          required={true}
          {...register("name")}
        />

        <div className="flex gap-x-6">
          <div className="w-1/2">
            <PrimaryInput
              label="Phone"
              type="text"
              placeholder="Enter Phone"
              {...register("phone")}
            />
          </div>
          <div className="w-1/2">
            <PrimaryInput
              label="Date of Birth In AD"
              type="date"
              {...register("dob_ad")}
            />
          </div>
        </div>
        <PrimaryInput
          label="Address"
          type="text"
          placeholder="Enter Address"
          {...register("address")}
        />
        <div className="flex gap-x-6">
          <div className="w-1/2">
            <DropdownController
              name={"gender"}
              label={"Enter Gender"}
              control={control}
              options={[
                {
                  value: "Male",
                  label: "Male",
                },
                {
                  value: "Female",
                  label: "Female",
                },
                {
                  value: "Others",
                  label: "Others",
                },
              ]}
            />
          </div>
          <div className="w-1/2">
            <DropdownController
              name={"marital_status"}
              label={"Enter Marital Status"}
              control={control}
              options={[
                {
                  value: "Single",
                  label: "Single",
                },
                {
                  value: "Married",
                  label: "Married",
                },
              ]}
            />
          </div>
        </div>

        <PrimaryInput
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />

        {type === "add" && (
          <PrimaryInput
            label="Password"
            type="password"
            placeholder="Enter Password"
            autoComplete={"new-password"}
            {...register("password")}
          />
        )}
      </div>
      <Button> {type === "add" ? "Add" : "Edit"} User</Button>
    </Modal.Form>
  );
};
