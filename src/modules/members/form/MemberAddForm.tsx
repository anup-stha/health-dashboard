/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 12:16 PM
 *
 *
 */

import React from "react";
import { Modal } from "@/components/Modal/useModal";
import { useForm } from "react-hook-form";
import { memberStore } from "../memberStore";
import { addNormalMember } from "@/services/requests/memberRequests";
import { PrimaryInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { alert } from "@/components/Alert";
import moment from "moment";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";

interface MemberAddFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  dob_ad: number;
  dob_bs: number;
  gender: "Male" | "Female" | "Others";
  marital_status: "Single" | "Married";
}

export const MemberAddForm = () => {
  const { register, handleSubmit, reset, control } =
    useForm<MemberAddFormData>();
  const { selectedRole } = memberStore();

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
        await alert({
          promise: addNormalMember({
            ...data,
            dob_ad: moment(data.dob_ad).unix(),
            role_id: Number(selectedRole.id),
          }).then(() => reset()),
          msgs: {
            loading: "Adding Member",
            success: "Added Successfully",
          },
          id: "Member Add Toast",
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
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
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
                  value: "single",
                  label: "Single",
                },
                {
                  value: "marital",
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
      </div>
      <Button>Add User</Button>
    </Modal.Form>
  );
};
