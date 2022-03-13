/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/11/22, 11:41 AM
 *
 *
 */

import React from "react";

type BooleanTagProps = {
  type: "error" | "warning" | "info";
  condition?: boolean;
  trueStatement?: string;
  falseStatement?: string;
};

export const BooleanTag: React.FC<BooleanTagProps> = ({
  type,
  condition,
  trueStatement,
  falseStatement,
}) => {
  return (
    <>
      {type === "error" ? (
        condition ? (
          <span className="px-4 py-1  font-bold text-primary-700 bg-primary-100 rounded-lg">
            {trueStatement}
          </span>
        ) : (
          <span className="px-4 py-1 bg-red-50 font-bold text-red-500 rounded-lg">
            {falseStatement}
          </span>
        )
      ) : type === "info" ? (
        <span className="px-2 py-1  font-bold text-primary_gray-600 bg-primary_gray-100 rounded-lg">
          {trueStatement}
        </span>
      ) : (
        <span className="px-4 py-1  font-bold text-yellow-400 bg-yellow-50 rounded-lg">
          {condition ? trueStatement : falseStatement}
        </span>
      )}
    </>
  );
};
