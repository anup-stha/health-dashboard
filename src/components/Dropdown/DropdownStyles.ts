import { StylesConfig } from "react-select";

import { OptionType } from "@/models/utils.model";

type isMulti = false;

export const dropdownStyles: StylesConfig<OptionType, isMulti> = {
  option: (provided, state) => ({
    ...provided,
    color: "gray",
    background: state.isFocused ? "#dcfce7" : "white",
    padding: "0.4rem 1.5rem",
    cursor: "pointer",
    textTransform: "capitalize",
    zIndex: 100,
  }),

  valueContainer: (provided) => ({
    ...provided,
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
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  input: (provided) => ({
    ...provided,
    padding: "0",
  }),
  singleValue: (provided) => ({
    ...provided,
    padding: "0",
  }),
  placeholder: (provided) => ({
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
