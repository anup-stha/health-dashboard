/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import Error from "next/error";

// eslint-disable-next-line require-jsdoc
export default function Page() {
  return <Error statusCode={404} />;
}
