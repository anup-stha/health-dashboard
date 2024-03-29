/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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

import { useAddUser, useNestedAddUser } from "@/modules/members/hooks/query/useMemberList";
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
  parent_member_id?: number;
  selectedRole: Role;
}

export const UserAddForm: React.FC<UserAddFormProps> = ({
  type = "add",
  handleSubmit,
  control,
  register,
  reset,
  setValue,
  watch,
  parent_member_id,
  resetField,
  selectedRole,
}) => {
  const { mutateAsync: mutate } = useAddUser();
  const { mutateAsync: nestedmutate } = useNestedAddUser(parent_member_id ?? 0);

  const member_detail_categories = selectedRole.member_detail_categories && selectedRole.member_detail_categories;

  const dob = watch("dob_ad");

  useEffect(() => {
    setValue("age", moment(new Date()).diff(dob, "years"));
  }, [dob]);

  return (
    <Modal.Form
      onSubmit={handleSubmit<UserAddFormData>(async (data) => {
        const body = {
          ...data,
          dob_ad: moment(data.dob_ad).unix(),
          role_id: Number(selectedRole.id),
          parent_member_id,
        };
        const values = Object.values(body);
        const keys = Object.keys(body);

        const requestBody: Record<string, any>[] = [];
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
        const response = parent_member_id
          ? await promiseToast({
              promise: nestedmutate(finalBody),
              msgs: {
                loading: "Adding Member",
                success: "Added Successfully",
              },
              id: "patient-add-toast",
            })
          : await promiseToast({
              promise: mutate(finalBody),
              msgs: {
                loading: "Adding Member",
                success: "Added Successfully",
              },
              id: "member-add-toast",
            });
      })}
    >
      <Modal.Scrollable>
        <div className="space-y-4">
          <Input
            label="Name"
            type="text"
            placeholder="Enter Name"
            required={true}
            data-testid="name"
            {...register("name")}
          />

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

          <Input
            label="Street Address"
            type="text"
            data-testid="address"
            placeholder="Enter Address"
            {...register("address")}
          />
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

          <Input label="Email" type="email" data-testid="email" placeholder="Enter email" {...register("email")} />
          {type === "add" && (
            <Input
              label="Password"
              type="password"
              data-testid="password"
              placeholder="Enter Password"
              autoComplete="new-password"
              {...register("password")}
            />
          )}

          {type === "add" &&
            selectedRole &&
            member_detail_categories.map((category: MemberDetailCategory) => {
              return (
                <Fragment key={category.id}>
                  {category.value_type?.toLowerCase() === "boolean" ? (
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
        <Button data-testid="member-add-btn">{type === "add" ? "Add" : "Edit"} User</Button>
      </div>
    </Modal.Form>
  );
};
