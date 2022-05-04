/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import Error from "next/error";

// eslint-disable-next-line require-jsdoc
export default function Page() {
  return <Error statusCode={404} />;
}
