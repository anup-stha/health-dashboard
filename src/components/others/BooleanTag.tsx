import React from "react";

type BooleanTagProps = {
  type: "error" | "warning";
  condition: boolean;
  trueStatement: string;
  falseStatement: string;
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
          <span
            className={`px-4 py-1  font-bold text-green-700 bg-green-100 rounded-3xl`}
          >
            {trueStatement}
          </span>
        ) : (
          <span
            className={`px-4 py-1 bg-red-50 font-semibold text-red-500 rounded-3xl`}
          >
            {falseStatement}
          </span>
        )
      ) : (
        <span
          className={`px-4 py-1  font-bold text-yellow-400 bg-yellow-50 rounded-3xl`}
        >
          {condition ? trueStatement : falseStatement}
        </span>
      )}
    </>
  );
};
