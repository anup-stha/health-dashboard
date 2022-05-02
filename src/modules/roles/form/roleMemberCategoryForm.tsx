/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { Switch } from "@/components/Switch";

import { postMemberCategoryToast, postUpdateMemberCategoryToast } from "@/modules/roles/toasts/membersToast";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { useGlobalState } from "@/modules/useGlobalState";

type memberCategoryFormProps = {
  type: "add" | "edit";
  id: number;
};

export const RoleMemberCategoryForm: React.FC<memberCategoryFormProps> = ({ type, id }) => {
  const { selectedRole, memberCategoryList } = useRoleStore();
  const categoryInitialData = id && memberCategoryList.filter((category) => category.id === id)[0];

  const { register, handleSubmit, control } = useForm({
    defaultValues: categoryInitialData
      ? categoryInitialData
      : {
          required: true,
        },
  });

  const options = useGlobalState.getState().base.data_types.map((element) => ({ value: element, label: element }));

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
        <DropdownController options={options} name="value_type" label="Select Value Type" control={control} />
        <Input required={true} label="Name" type="text" placeholder="Enter Name" {...register("name")} />
        <Switch name="required" control={control} label=" Required " />
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
  isDisabled?: boolean;
  noOptionMessage?: string;
};

export const DropdownController: React.FC<DropdownProps> = ({
  name,
  label,
  control,
  options,
  isDisabled,
  noOptionMessage = "No Options Found",
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
      width: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "16px",
      color: "#525252",
      cursor: "pointer",
    }),
    indicatorsContainer: (provide: any) => ({
      ...provide,
      padding: 0,
    }),
    input: (provide: any) => ({
      ...provide,
      padding: "0",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      padding: "0",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "rgb(115 115 115)",
    }),
    control: () => ({
      background: "white",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "0.375rem",
      border: "solid rgb(229 229 229) 1px ",
      borderBottom: "solid rgb(34 197 94) 1px",
      padding: "1.25rem 1.5rem",
      color: "rgb(82 82 82)",
      fontSize: "1.125rem",
      textTransform: "capitalize",
    }),
  };

  return (
    <div className="z-[100]">
      {label && <label className="input_label">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            isDisabled={isDisabled}
            key={`my_unique_select_key__${value}`}
            ref={ref}
            placeholder="Choose"
            options={options}
            value={options.find((c) => c.value === value)}
            onChange={(val: any) => {
              onChange(val.value);
            }}
            isSearchable={true}
            styles={customStyles}
            noOptionsMessage={({ inputValue }) => (!inputValue ? noOptionMessage : "No results found")}
          />
        )}
      />
    </div>
  );
};

export const MultiDropdown: React.FC<DropdownProps> = ({ name, label, control, options }) => {
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
      boxShadow: "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 3px 5px 0px rgba(9,30,66,0.2)",
    }),
  };

  return (
    <div className="z-[100]">
      <label className="input_label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            ref={ref}
            options={options}
            value={options.filter((option) => value?.includes(option.value))}
            defaultValue={options.filter((option) => value?.includes(option.value))}
            onChange={(options) => onChange(options?.map((option: any) => option.value))}
            isSearchable={false}
            styles={customStyles}
            isMulti={true}
          />
        )}
      />
    </div>
  );
};
