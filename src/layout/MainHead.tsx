/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
