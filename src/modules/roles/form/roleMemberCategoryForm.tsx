/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/31/22, 2:45 PM
 *
 *
 */

import { PrimaryInput, SwitchInput } from "@/components/Input";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { Button } from "@/components/Button";
import Select from "react-select";
import { useGlobalState } from "@/modules/useGlobalState";
import {
  postMemberCategoryToast,
  postUpdateMemberCategoryToast,
} from "@/modules/member/api/toasts/membersToast";

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

  const { register, handleSubmit, control } = useForm({
    defaultValues: categoryInitialData ? categoryInitialData : {},
  });

  const options = useGlobalState
    .getState()
    .base.data_types.map((element) => ({ value: element, label: element }));

  return (
    <Modal.Form
      onSubmit={handleSubmit((data) => {
        type === "add"
          ? postMemberCategoryToast({
              ...data,
              required: data.required ? 1 : 0,
              role_id: Number(selectedRole.id),
            })
          : postUpdateMemberCategoryToast(
              {
                name: data.name,
                value_type: data.value_type,
                required: data.required ? 1 : 0,
              },
              id ?? 0
            );
      })}
    >
      <div className="space-y-4">
        <DropdownController
          options={options}
          name={"value_type"}
          label={"Select Value Type"}
          control={control}
        />
        <PrimaryInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />
        <SwitchInput
          label="Required"
          type="number"
          placeholder="Enter Required Field"
          {...register("required")}
        />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"} Category</Button>
    </Modal.Form>
  );
};
type DropdownProps = {
  name: string;
  label: string;
  control: any;
  options: Array<any>;
};

export const DropdownController: React.FC<DropdownProps> = ({
  name,
  label,
  control,
  options,
}) => {
  const customStyles: any = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: "gray",
      background: state.isFocused ? "#dcfce7" : "white",
      padding: "0.4rem 1.5rem",
      cursor: "pointer",
      textTransform: "capitalize",
      zIndex: 100,
    }),

    valueContainer: (provide: any) => ({
      ...provide,
      padding: 0,
    }),

    indicatorSeparator: () => ({
      padding: 0,
      color: "#d4d4d4",
    }),

    dropdownIndicator: () => ({
      padding: 0,
      color: "#525252",
      cursor: "pointer",
    }),
    indicatorsContainer: (provide: any) => ({
      ...provide,
      padding: 0,
    }),
    input: () => ({
      padding: "0",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      padding: "0",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#262626",
    }),
    control: () => ({
      background: "white",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "0.25rem",
      borderBottom: "solid rgb(34, 197, 94) 1px",
      padding: "1rem 1.5rem",
      color: "#262626",
      fontSize: "1.125rem",
      textTransform: "capitalize",
      boxShadow:
        "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 3px 5px 0px rgba(9,30,66,0.2)",
    }),
  };

  return (
    <div className={"z-[100]"}>
      <label className="input_label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            ref={ref}
            options={options}
            value={options.find((c) => c.value === value)}
            onChange={(val: any) => {
              onChange(val.value);
            }}
            isSearchable={false}
            styles={customStyles}
          />
        )}
      />
    </div>
  );
};

export const MultiDropdown: React.FC<DropdownProps> = ({
  name,
  label,
  control,
  options,
}) => {
  const customStyles: any = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: "gray",
      background: state.isFocused ? "#dcfce7" : "white",
      padding: "0.4rem 1.5rem",
      cursor: "pointer",
      textTransform: "capitalize",
      zIndex: 100,
    }),

    valueContainer: (provide: any) => ({
      ...provide,
      padding: 0,
    }),

    clearIndicator: (provide: any) => ({
      ...provide,
      padding: 0,
    }),

    indicatorSeparator: () => ({
      padding: 0,
      color: "#d4d4d4",
    }),

    dropdownIndicator: () => ({
      padding: 0,
      color: "#525252",
      cursor: "pointer",
    }),
    indicatorsContainer: (provide: any) => ({
      ...provide,
      padding: 0,
    }),
    input: () => ({
      padding: "0",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      padding: "0",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#262626",
    }),
    control: () => ({
      background: "white",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "0.25rem",
      borderBottom: "solid rgb(34, 197, 94) 1px",
      padding: "1rem 1.5rem",
      color: "#262626",
      fontSize: "1.125rem",
      textTransform: "capitalize",
      boxShadow:
        "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 3px 5px 0px rgba(9,30,66,0.2)",
    }),
  };

  return (
    <div className={"z-[100]"}>
      <label className="input_label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            ref={ref}
            options={options}
            value={options.filter((option) => value?.includes(option.value))}
            defaultValue={options.filter((option) =>
              value?.includes(option.value)
            )}
            onChange={(options) =>
              onChange(options?.map((option: any) => option.value))
            }
            isSearchable={false}
            styles={customStyles}
            isMulti={true}
          />
        )}
      />
    </div>
  );
};
