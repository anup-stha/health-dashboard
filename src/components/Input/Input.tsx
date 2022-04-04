import clsx from "clsx";
import { Envelope, Eye, EyeSlash, Key, WarningCircle } from "phosphor-react";
import React, { HTMLInputTypeAttribute } from "react";

type ExtraInputProps = {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
};

type HookInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  ExtraInputProps;

export const Input = React.forwardRef<HTMLInputElement, HookInputProps>(
  ({ label, icon, error, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const icons: Partial<Record<HTMLInputTypeAttribute, React.ReactNode>> = {
      email: <Envelope size="24" weight="light" />,
      password: <Key size="24" weight="light" />,
    };
    const hasIcons = icon ?? Object.keys(icons).includes(type);
    const isPassword = type === "password";

    return (
      <>
        <div className="input relative">
          {hasIcons && (
            <div className="absolute top-1/2 left-6 -translate-y-0.5 text-gray-500">{icon ?? icons[type]}</div>
          )}

          {error && (
            <div className="absolute top-1/2 right-6 -translate-y-1.5 text-red-500">
              <WarningCircle size={28} />
            </div>
          )}

          {error && <span className="absolute top-0 right-0 text-lg text-red-500">{error}</span>}

          {isPassword && (
            <button
              type="button"
              className="absolute top-1/2 right-6 -translate-y-0.5 text-gray-500 cursor-pointer hover:text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} weight="duotone" /> : <EyeSlash size={20} weight="duotone" />}
            </button>
          )}

          <input
            className={clsx("transition-shadow", {
              input_icon_error: hasIcons && !!error,
              input_icon_container: hasIcons && !error,
              input_container: !hasIcons && !error,
              input_error: !hasIcons && !!error,
            })}
            type={!showPassword ? type : "text"}
            placeholder={label}
            id={label}
            ref={ref}
            {...props}
          />

          <label htmlFor={label} className="input_label">
            {label} {props.required ? <span className="text-lg text-error-600"> *</span> : null}
          </label>
        </div>
      </>
    );
  }
);

Input.displayName = "Input";
