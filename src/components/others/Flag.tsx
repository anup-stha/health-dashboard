/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

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
