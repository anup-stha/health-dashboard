/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:23 PM
 *
 *
 */

import moment from "moment";
import React, { Fragment } from "react";
import { UseFormReturn } from "react-hook-form";

import { alert, toastAlert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { SwitchInput } from "@/components/Input";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/useModal";
import { ProvinceDropdown } from "@/components/ProvinceDropdown/ProvinceDropdown";

import { useAddPatient, useNestedAddPatient } from "@/modules/members/hooks/query/useMemberList";
import { Member } from "@/modules/members/types";
import { useGetOtherFieldsList } from "@/modules/others/utils/hooks/useOtherFieldsList";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { updateUserProfile } from "@/services/requests/authRequests";

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
    Pick<UseFormReturn<any>, "register" | "handleSubmit" | "control" | "reset" | "watch" | "resetField">
  > {
  type?: "edit" | "add";
  initialData?: Member;
  selectedRole: Role;
  parent_member_id?: number;
}

export const MemberAddEditForm: React.FC<UserAddFormProps> = ({
  type = "add",
  handleSubmit,
  control,
  register,
  reset,
  initialData,
  selectedRole,
  parent_member_id,
  resetField,
  watch,
}) => {
  useGetOtherFieldsList();
  const { mutateAsync: mutate } = useAddPatient();

  const { mutateAsync: nestedmutate } = useNestedAddPatient(parent_member_id ?? 0);

  const member_detail_categories = selectedRole.member_detail_categories && selectedRole.member_detail_categories;

  return (
    <Modal.Form
      onSubmit={handleSubmit<UserAddFormData>(async (data: any) => {
        const body = {
          ...data,
          dob_ad: moment(data.dob_ad).unix(),
          role_id: selectedRole.id,
        };

        const values = Object.values(body);
        const keys = Object.keys(body);

        const requestBody: Record<string, unknown>[] = [];
        requestBody.push(
          ...keys.map((element, index) => {
            if (isNaN(Number(element[0]))) {
              return { [element]: values[index] };
            }

            return {
              [`${element[0]}-detail`]: {
                detail_category_id: Number(element.split("-")[0]),
                value: values[index],
              },
            };
          })
        );

        const finalBody = requestBody.reduce((acc: any, curr) => {
          if (isNaN(Number(Object.keys(curr)[0][0]))) {
            acc = { ...acc, ...curr };
          } else if (acc.details) {
            acc.details.push(Object.values(curr)[0]);
          } else {
            acc.details = [Object.values(curr)[0]];
          }

          return acc;
        }, {});

        parent_member_id
          ? await toastAlert({
              type: "promise",
              promise: nestedmutate(finalBody).then(() => reset()),
              msgs: {
                loading: "Adding Member",
                success: "Added Successfully",
              },
              id: "patient-add-toast",
            })
          : type === "add"
          ? await toastAlert({
              type: "promise",
              promise: mutate(finalBody).then(() => reset()),
              msgs: {
                loading: "Adding Member",
                success: "Added Successfully",
              },
              id: "patient-add-toast",
            })
          : initialData &&
            (await alert({
              promise: updateUserProfile(initialData.member_id ?? initialData.id, {
                ...data,
                dob_ad: moment(data.dob_ad).unix(),
              }),
              msgs: {
                loading: "Updating Member",
                success: "Updated Successfully",
              },
              id: "member-update-toast",
            }));
      })}
    >
      <Modal.Scrollable>
        <div className="space-y-8">
          <Input label="Name" type="text" placeholder="Enter Name" required={true} {...register("name")} />

          {type === "add" ? (
            <div className="flex gap-x-6">
              <div className="w-1/2">
                <Input label="Phone" type="text" placeholder="Enter Phone" {...register("phone")} required={true} />
              </div>
              <div className="w-1/2">
                <Input
                  label="Date of Birth In AD"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("dob_ad")}
                />
              </div>
            </div>
          ) : (
            <div className="w-full">
              <Input
                label="Date of Birth In AD"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...register("dob_ad")}
              />
            </div>
          )}

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

          <ProvinceDropdown control={control} watch={watch} resetField={resetField} />

          <Input label="Street Address" type="text" placeholder="Enter Street Address" {...register("address")} />

          {type === "add" && <Input label="Email" type="email" placeholder="Enter email" {...register("email")} />}

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
                      required={!!category.required}
                      placeholder={`Enter ${category.name}`}
                      {...register(`${category.id}-${category.slug}-details`)}
                    />
                  )}
                </Fragment>
              );
            })}
        </div>
      </Modal.Scrollable>
      <div className="px-2">
        <Button> {type === "add" ? "Add" : "Edit"} User</Button>
      </div>
    </Modal.Form>
  );
};
