import { Eye, EyeClosed } from "phosphor-react";
import React, { useState } from "react";
import ErrorPop from "../PopOver";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  field?: any;
  error?: string;
  props?: any;
  className?: string;
  showLabel?: boolean;
  checkboxLabel?: string;
};

export const PrimaryInput: React.FC<InputProps> = ({
  id,
  error,
  type,
  value,
  onChange,
  field,
  props,
  className,
  placeholder,
  showLabel,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <div className={`relative w-full input`}>
        {error && <ErrorPop error={error} />}
        {((field && field.name) || type) === "password" && (
          <button
            type="button"
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
        <input
          className={error ? "input_error" : "input_container"}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          required
          value={value}
          onChange={(e) => {
            onChange && onChange(e);
            setShowPassword(true);
          }}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {showLabel && (
          <label htmlFor={id} className="input_label">
            {placeholder}
          </label>
        )}
      </div>
    </div>
  );
};

export const CheckBoxInput: React.FC<InputProps> = ({
  field,
  props,

  checkboxLabel,
}) => {
  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        className="form-checkbox h-8 w-8 shadow-E300 border-2 border-green-500 text-green-500 rounded-md focus:ring-green-600 focus:ring-2 focus:ring-opacity-50"
        {...field}
        {...props}
      />
      <span className="ml-4 text-gray-800 text-xl font-semibold  capitalize">
        {field.name}
      </span>
    </label>
  );
};

export const LabelInput: React.FC<InputProps> = ({
  id,
  error,
  type,
  value,
  onChange,
  field,
  props,
  className,
  placeholder,
}) => {
  return (
    <div className="relative w-full input">
      <input
        className={error ? "input_error" : "input_container"}
        required
        value={value}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        placeholder={placeholder}
        {...field}
        {...props}
      />

      <label htmlFor={id} className="input_label capitalize">
        {field.name}
      </label>
    </div>
  );
};
