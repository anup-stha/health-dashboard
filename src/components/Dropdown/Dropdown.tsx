import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

import { dropdownStyles } from "@/components/Dropdown/DropdownStyles";

type DropdownProps = {
  name: string;
  label: string;
  control: any;
  options: string[] | null;
  isDisabled?: boolean;
  isSearchable?: boolean;
  noOptionMessage?: string;
};

export const Dropdown = ({
  name,
  label,
  control,
  options,
  isDisabled,
  isSearchable,
  noOptionMessage = "No Options Found",
}: DropdownProps) => {
  const reactSelectOptions = options ? options.map((province) => ({ label: province, value: province })) : [];

  return (
    <div className="z-[100]">
      {label && <label className="input_label">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            key={`my_unique_select_key__${value}`}
            isDisabled={isDisabled}
            ref={ref}
            placeholder="Choose"
            options={reactSelectOptions}
            value={reactSelectOptions.find((c) => c.value === value)}
            onChange={(val: any) => {
              onChange(val.value);
            }}
            isSearchable={isSearchable}
            styles={dropdownStyles}
            noOptionsMessage={({ inputValue }) => (!inputValue ? noOptionMessage : "No results found")}
          />
        )}
      />
    </div>
  );
};
