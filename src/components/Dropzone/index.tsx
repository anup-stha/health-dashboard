/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Control, Controller } from "react-hook-form";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  padding: "6rem",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "##e2e8f0",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  fontSize: "1.2rem",
};

const focusedStyle = {
  borderColor: "#22c55e",
};

const acceptStyle = {
  borderColor: "#15803d",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const activeStyle = {
  color: "rgb(96,255,43)",
};

export const dropdownStyles = {
  baseStyle,
  focusedStyle,
  acceptStyle,
  activeStyle,
  rejectStyle,
};

const Dropzone = ({ onChange, label }: { onChange: any; label?: string }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    onChange(acceptedFiles[0]);
  }, []);
  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    onDrop,
    accept: "application/vnd.android.package-archive",
  });

  const style = useMemo(
    () => ({
      ...dropdownStyles.baseStyle,
      ...(isFocused ? dropdownStyles.focusedStyle : {}),
      ...(isDragAccept ? dropdownStyles.acceptStyle : {}),
      ...(isDragReject ? dropdownStyles.rejectStyle : {}),
      ...(acceptedFiles.length !== 0 ? dropdownStyles.activeStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section className="space-y-2">
      <label className="block text-xl font-medium text-gray-700">{label}</label>
      <div {...getRootProps({ style })}>
        <input {...getInputProps({ onChange })} />
        {acceptedFiles.length === 0 ? (
          <p>Drag and drop resource file her, or click to select that file</p>
        ) : (
          <p>Selected File: {acceptedFiles[0].name}</p>
        )}
      </div>
    </section>
  );
};

export const DropZoneField = ({
  name,
  control,
  label,
  ...rest
}: {
  name: string;
  control: Control<any>;
  label?: string;
}) => {
  return (
    <Controller
      render={({ field: { onChange } }) => <Dropzone onChange={onChange} label={label} {...rest} />}
      name={name}
      control={control}
      defaultValue=""
    />
  );
};
