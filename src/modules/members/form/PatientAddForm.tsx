/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/13/22, 8:02 PM
 *
 *
 */

import { PrimaryInput, SwitchInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { UseFormReturn } from "react-hook-form";
import { useMemberStore } from "../useMemberStore";
import { Button } from "@/components/Button";
import moment from "moment";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import React, { Fragment } from "react";
import { postPatientDetailsToast } from "@/modules/members/api/toasts/membersToast";
import { MemberDetailCategory, Role } from "@/types";
import { MedicalHistoryForm } from "@/modules/members/modal/PatientMedicalHistoryModal";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { useGetOtherFieldsList } from "@/modules/others/utils/hooks/useOtherFieldsList";

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

interface UserAddFormProps
  extends Partial<
    Pick<
      UseFormReturn,
      "register" | "handleSubmit" | "control" | "reset" | "watch"
    >
  > {
  type?: "edit" | "add";
}

export const PatientAddForm: React.FC<UserAddFormProps> = ({
  type = "add",
  handleSubmit,
  control,
  register,
  reset,
  watch,
}) => {
  useGetOtherFieldsList();
  const selectedRole = useMemberStore((state) => state.selectedRole) as Role;
  const medicalHistoryFields = useOtherFieldsStore(
    (state) => state.othersFieldList.data
  );

  return handleSubmit && register && control && reset ? (
    <Modal.Form
      onSubmit={handleSubmit<UserAddFormData>(async (data) => {
        await postPatientDetailsToast({
          ...data,
          dob_ad: moment(data.dob_ad).unix(),
          role_id: Number(selectedRole.id),
        })?.then(() => reset());
      })}
    >
      <Modal.Scrollable>
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
                max={new Date().toISOString().split("T")[0]}
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
                  {
                    value: "Not-Specified",
                    label: "Not Specified",
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
                  {
                    value: "Not-Specified",
                    label: "Not Specified",
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

          {selectedRole &&
            selectedRole.member_detail_categories &&
            selectedRole.member_detail_categories.map(
              (category: MemberDetailCategory) => (
                <Fragment key={category.id}>
                  {category.value_type.toLowerCase() === "boolean" ? (
                    <SwitchInput
                      label={category.name}
                      type="number"
                      placeholder={`Enter ${category.name}`}
                      {...register(`${category.id}-${category.slug}-details`)}
                    />
                  ) : (
                    <PrimaryInput
                      label={category.name}
                      type={category.value_type}
                      required={!!category.required}
                      placeholder={`Enter ${category.name}`}
                      {...register(`${category.id}-${category.slug}-details`)}
                    />
                  )}
                </Fragment>
              )
            )}

          <div className="grid grid-cols-1 gap-y-10 w-full">
            {medicalHistoryFields.map((field) => (
              <div className="flex " key={field.id}>
                <MedicalHistoryForm
                  id={field.id}
                  slug={field.slug}
                  name={field.name}
                  control={control}
                  register={register}
                  watch={watch}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal.Scrollable>
      <div className="px-2">
        <Button> {type === "add" ? "Add" : "Edit"} User</Button>
      </div>
    </Modal.Form>
  ) : null;
};
