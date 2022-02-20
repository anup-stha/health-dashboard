/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 9:39 AM
 *
 *
 */

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  padding: "12rem",
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

export const dropdownStyles = {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
};
