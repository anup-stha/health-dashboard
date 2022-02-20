/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/6/22, 11:55 AM
 *
 *
 */

import { isArray } from "lodash";
import { NextSeo } from "next-seo";
import React from "react";

type mainHeadProps = {
  title: string | string[] | undefined;
};

export const MainHead: React.FC<mainHeadProps> = ({ title }) => {
  return (
    <NextSeo
      title={`Sunya Health ${
        title
          ? `| ${
              !isArray(title) &&
              title &&
              title.replace("_", " ").replace(/(^|\s)\S/g, function (t) {
                return t.toUpperCase();
              })
            }`
          : " "
      }`}
    />
  );
};
