/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 1:48 PM
 *
 *
 */

import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/Button";
import Input, { SwitchInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { ProvinceDropdown } from "@/components/ProvinceDropdown/ProvinceDropdown";
import { promiseToast } from "@/components/Toast";

import { MedicalHistoryForm } from "@/modules/members/components/form/MedicalHistoryForm";
import { useAddPatient, useNestedAddPatient } from "@/modules/members/hooks/query/useMemberList";
import { useGetOtherFieldsList } from "@/modules/others/utils/hooks/useOtherFieldsList";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";

import { MemberDetailCategory, Role } from "@/types";

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
  extends Required<
    Pick<UseFormReturn<any>, "register" | "handleSubmit" | "control" | "reset" | "watch" | "resetField" | "setValue">
  > {
  type?: "edit" | "add";
  selectedRole: Role;
  parent_member_id?: number;
}

export const PatientAddForm: React.FC<UserAddFormProps> = ({
  type = "add",
  handleSubmit,
  control,
  register,
  reset,
  watch,
  selectedRole,
  resetField,
  setValue,
  parent_member_id,
}) => {
  useGetOtherFieldsList();
  const medicalHistoryFields = useOtherFieldsStore((state) => state.othersFieldList.data);

  const { mutateAsync: mutate } = useAddPatient();
  const { mutateAsync: nestedmutate } = useNestedAddPatient(parent_member_id ?? 0);

  type patientDetails = {
    [key: string]: any;
  };

  const member_detail_categories = selectedRole.member_detail_categories && selectedRole.member_detail_categories;

  const dob = watch("dob_ad");

  useEffect(() => {
    setValue("age", moment(new Date()).diff(dob, "years"));
  }, [dob]);

  return (
    <Modal.Form
      onSubmit={handleSubmit<UserAddFormData>(async (data: any) => {
        const body = {
          ...data,
          dob_ad: moment(data.dob_ad).unix(),
          role_id: selectedRole.id,
          parent_member_id,
        };

        const keys = Object.keys(body);

        const finalBody = keys.reduce((acc: patientDetails, curr: any) => {
          if (isNaN(Number(curr.split("-")[0]))) {
            const obj = { [curr]: body[curr] };
            acc = { ...acc, ...obj };
          } else if (acc.details && curr.split("-")[2] === "details") {
            acc.details.push({
              detail_category_id: curr.split("-")[0],
              value: body[curr],
            });
          } else if (curr.split("-")[2] === "details") {
            acc.details = [
              {
                detail_category_id: curr.split("-")[0],
                value: body[curr],
              },
            ];
          } else if (acc.medical_history && curr.split("-")[2] === "note") {
            acc.medical_history = acc.medical_history.map((element: any) =>
              element.detail_category_id === Number(curr.split("-")[0])
                ? {
                    ...element,
                    note: element.value === "No" ? "N/A" : body[curr],
                  }
                : element
            );
          } else if (acc.medical_history) {
            acc.medical_history.push({
              detail_category_id: Number(curr.split("-")[0]),
              value: body[curr] ? "Yes" : "No",
              note: "N/A",
            });
          } else {
            acc.medical_history = [
              {
                detail_category_id: Number(curr.split("-")[0]),
                value: body[curr] ? "Yes" : "No",
                note: "N/A",
              },
            ];
          }

          return acc;
        }, {});

        return parent_member_id
          ? await promiseToast({
              promise: nestedmutate(finalBody).then(() => reset()),
              msgs: {
                loading: "Adding Member",
                success: "Added Successfully",
              },
              id: "patient-add-toast",
            })
          : await promiseToast({
              promise: mutate(finalBody).then(() => reset()),
              msgs: {
                loading: "Adding Member",
                success: "Added Successfully",
              },
              id: "patient-add-toast",
            });
      })}
    >
      <Modal.Scrollable>
        <div className="space-y-4">
          <Input label="Name" type="text" placeholder="Enter Name" {...register("name")} />

          <Input label="Phone" type="number" placeholder="Enter Phone" {...register("phone")} />

          <div className="flex gap-x-6">
            <div className="w-1/2">
              <Input
                label="Date of Birth In AD"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...register("dob_ad")}
              />
            </div>
            <div className="w-1/2">
              <Input label="Age" type="number" placeholder="Enter Age" {...register("age")} />
            </div>
          </div>
          <ProvinceDropdown control={control} watch={watch} resetField={resetField} />
          <Input label="Street Address" type="text" placeholder="Enter Street Address" {...register("address")} />
          <div className="flex gap-x-6">
            <div className="w-1/2">
              <DropdownController
                name="gender"
                label="Enter Gender"
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
                name="marital_status"
                label="Enter Marital Status"
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

          <Input label="Email" type="email" placeholder="Enter email" {...register("email")} />

          {type === "add" &&
            selectedRole &&
            member_detail_categories.map((category: MemberDetailCategory) => {
              return (
                <Fragment key={category.id}>
                  {category.value_type.toLowerCase() === "boolean" ? (
                    <SwitchInput
                      label={category.name}
                      type="number"
                      placeholder={`Enter ${category.name}`}
                      {...register(`${category.id}-${category.slug}-details`)}
                    />
                  ) : (
                    <Input
                      label={category.name}
                      type={category.value_type}
                      required={false}
                      placeholder={`Enter ${category.name}`}
                      {...register(`${category.id}-${category.slug}-details`)}
                    />
                  )}
                </Fragment>
              );
            })}

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
  );
};
