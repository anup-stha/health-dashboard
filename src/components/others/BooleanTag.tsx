/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import React from "react";

type BooleanTagProps = {
  type: "error" | "warning" | "info";
  condition?: boolean;
  trueStatement?: string;
  falseStatement?: string;
};

export const BooleanTag: React.FC<BooleanTagProps> = ({ type, condition, trueStatement, falseStatement }) => {
  return (
    <>
      {type === "error" ? (
        condition ? (
          <span className="px-4 py-1  font-bold text-primary-700 bg-primary-100 rounded-lg">{trueStatement}</span>
        ) : (
          <span className="px-4 py-1 bg-red-50 font-bold text-red-500 rounded-lg">{falseStatement}</span>
        )
      ) : type === "info" ? (
        <span className="px-2 py-1  font-bold text-gray-600 bg-gray-100 rounded-lg">{trueStatement}</span>
      ) : (
        <span className="px-4 py-1  font-bold text-yellow-400 bg-yellow-50 rounded-lg">
          {condition ? trueStatement : falseStatement}
        </span>
      )}
    </>
  );
};
