/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 8:44 PM
 *
 *
 */

import { PrimaryInput, SwitchInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/Button";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import React, { Fragment } from "react";
import { MemberDetailCategory } from "@/types";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { useGetOtherFieldsList } from "@/modules/others/utils/hooks/useOtherFieldsList";
import { useAddPatient } from "@/modules/member/api/hooks/useMemberList";
import moment from "moment";
import { useCurrentMemberStore } from "@/modules/member/useCurrentMemberStore";
import { toastAlert } from "@/components/Alert";
import { MedicalHistoryForm } from "@/modules/member/form/MedicalHistoryForm";

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
      UseFormReturn<any>,
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
  const selectedRole = useCurrentMemberStore((state) => state.role);
  const medicalHistoryFields = useOtherFieldsStore(
    (state) => state.othersFieldList.data
  );

  const { mutateAsync: mutate } = useAddPatient();

  type patientDetails = {
    [key: string]: any;
  };

  return handleSubmit && register && control && reset ? (
    <Modal.Form
      onSubmit={handleSubmit<UserAddFormData>(async (data: any) => {
        const body = {
          ...data,
          dob_ad: moment(data.dob_ad).unix(),
          role_id: selectedRole.id,
        };

        const keys = Object.keys(body);
        console.log(keys);

        const finalBody = keys.reduce((acc: patientDetails, curr: any) => {
          if (isNaN(Number(curr.split("-")[0]))) {
            const obj = { [curr]: body[curr] };
            acc = { ...acc, ...obj };
          } else if (acc.detail && curr.split("-")[2] === "details") {
            acc.detail.push({
              detail_cat_id: curr.split("-")[0],
              value: body[curr],
            });
          } else if (curr.split("-")[2] === "details") {
            acc.detail = [
              {
                detail_cat_id: curr.split("-")[0],
                value: body[curr],
              },
            ];
          } else if (acc.medical_history && curr.split("-")[2] === "note") {
            acc.medical_history = acc.medical_history.map((element: any) =>
              element.detail_cat_id === Number(curr.split("-")[0])
                ? {
                    ...element,
                    note: element.value === "No" ? "N/A" : body[curr],
                  }
                : element
            );
          } else if (acc.medical_history) {
            acc.medical_history.push({
              detail_cat_id: Number(curr.split("-")[0]),
              value: body[curr] ? "Yes" : "No",
              note: "N/A",
            });
          } else {
            acc.medical_history = [
              {
                detail_cat_id: Number(curr.split("-")[0]),
                value: body[curr] ? "Yes" : "No",
                note: "N/A",
              },
            ];
          }

          return acc;
        }, {});

        await toastAlert({
          type: "promise",
          promise: mutate(finalBody),
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
