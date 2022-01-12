/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/12/22, 2:58 PM
 *
 *
 */

import { NextPage } from "next";

interface IErrorPageProps {
  statusCode?: number;
}

const Error: NextPage<IErrorPageProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error has occurred. Please contact Sunya Health Administrator"}
    </p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
