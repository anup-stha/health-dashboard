import { EyeClosed } from "phosphor-react";
import React, { useState } from "react";
import { AlertTriangle, Eye } from "react-feather";
import styles from "./input.module.scss";
import { Popover } from "@headlessui/react";

export const PrimaryInput = ({
  type,
  id,
  value,
  onChange,
  error,
  field,
  setErrors,
  ...props
}: //   pattern = "0-9",
any) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.input + `  relative`}>
      {field.name === "password" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
          className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-6 top-1/2 hover:text-gray-600 nofadeInLogin"
        >
          <div className="relative flex ">
            <div
              className={`${
                !showPassword ? "absolute opacity-100" : "opacity-0"
              }`}
            >
              <Eye size={16} />
            </div>
            <div
              className={`${
                showPassword ? "absolute opacity-100" : "opacity-0"
              } `}
            >
              <EyeClosed size={16} />
            </div>
          </div>
        </button>
      )}
      {error && (
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute text-red-400 -translate-y-1/2 right-6 top-1/2 no_animation"
        >
          <Popover className="relative flex no_animation">
            <Popover.Button className="cursor-pointer">
              <AlertTriangle size={20} />
            </Popover.Button>

            <Popover.Panel className="absolute z-20 w-screen max-w-xs p-2 text-base text-right text-gray-700 -right-8 -top-20 no_animation">
              <div className="w-auto no_animation">
                <span className="w-full px-8 py-4 text-white bg-red-400 rounded-sm shadow-lg no_animation">
                  {error}
                </span>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      )}
      <input
        className={error ? styles.input_error : styles.input_container}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        required
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        {...field}
        {...props}
      />

      {/* <label htmlFor={id} className={styles.input_label}>
        {id}
      </label> */}
    </div>
  );
};
