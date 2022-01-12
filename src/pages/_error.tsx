/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/12/22, 3:11 PM
 *
 *
 */

import { NextPage } from "next";
import Image from "next/image";
import React from "react";

interface IErrorPageProps {
  statusCode?: number;
}

const Error: NextPage<IErrorPageProps> = ({ statusCode }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src={"/assets/404.svg"} alt="Error" />
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
