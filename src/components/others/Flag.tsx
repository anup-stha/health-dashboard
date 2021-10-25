import React from "react";
import BuiltInFlag from "react-flagkit";

// @ts-ignore: Unreachable code error
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

type FlagProps = {
  countryCode: string | undefined;
};

export const Flag: React.FC<FlagProps> = ({ countryCode }) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <BuiltInFlag country={countryCode} />
        <span>{regionNames.of(countryCode)}</span>
      </div>
    </>
  );
};
