import { EyeClosed } from "phosphor-react";
import React, { useState } from "react";
import { Eye } from "react-feather";
import styles from "./input.module.scss";

export const PrimaryInput = ({
  type,
  id,
  value,
  onChange = () => {},
}: //   pattern = "0-9",
any) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.input + `  relative`}>
      {type === "password" && (
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
        className={styles.input_container}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        placeholder={id}
        required
        value={value}
        onChange={(e) => onChange(e)}
      />

      {/* <label htmlFor={id} className={styles.input_label}>
        {id}
      </label> */}
    </div>
  );
};
