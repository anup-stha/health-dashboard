import { Field, Formik } from "formik";
import { Eye, EyeClosed } from "phosphor-react";
import React, { useState } from "react";
import InputErrorPop from "../PopOver";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  field: any;
  error: string;
  props: any;
  className?: string;
  showLabel: boolean;
};

export const Input: React.FC<InputProps> = ({
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
        {error && <InputErrorPop error={error} />}
        {(field.name || type) === "password" && (
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
            {id}
          </label>
        )}
      </div>
    </div>
  );
};

export const LoginInput: React.FC<any> = ({
  name,
  component,
  error,
  placeholder,
}) => {
  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={() => {}}>
      <Field
        name={name}
        component={component}
        error={error}
        placeholder={placeholder}
      />
    </Formik>
  );
};
