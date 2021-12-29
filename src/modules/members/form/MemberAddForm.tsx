/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:55 PM
 *
 *
 */

import React from "react";
import { Modal } from "@/components/Modal/useModal";
import { useForm } from "react-hook-form";
import { useMemberStore } from "../useMemberStore";
import { addNormalMember } from "@/services/requests/memberRequests";
import { PrimaryInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { alert } from "@/components/Alert";
import moment from "moment";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { User } from "@/types";
import { updateUserProfile } from "@/services/requests/authRequests";

type MemberAddFormProps = {
  initialData?: User;
  type?: "add" | "edit";
};

export const MemberAddForm: React.FC<MemberAddFormProps> = ({
  initialData,
  type = "add",
}) => {
  const { register, handleSubmit, reset, control } = useForm<User>({
    defaultValues: {
      ...initialData,
      dob_ad:
        initialData &&
        moment(Number(initialData?.dob_ad) * 1000).format("YYYY-MM-DD"),
    },
  });
  const { selectedRole } = useMemberStore();

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        type === "add"
          ? await alert({
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
            })
          : initialData &&
            (await alert({
              promise: updateUserProfile(initialData.member_id, {
                ...data,
                dob_ad: moment(data.dob_ad).unix(),
              }).then(() => reset()),
              msgs: {
                loading: "Updating Member",
                success: "Updated Successfully",
              },
              id: "member-update-toast",
            }));
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
          {type === "add" ? (
            <>
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
            </>
          ) : (
            <div className="w-full">
              <PrimaryInput
                label="Date of Birth In AD"
                type="date"
                {...register("dob_ad")}
              />
            </div>
          )}
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
        {type === "add" && (
          <PrimaryInput
            label="Email"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        )}
      </div>
      <Button>{type === "add" ? "Add" : "Update"} User</Button>
    </Modal.Form>
  );
};
