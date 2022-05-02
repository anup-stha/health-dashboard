/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { NextPage } from "next";

import { AppReleaseListPage } from "@/modules/app/AppReleaseListPage";

const AppReleaseNextPage: NextPage = () => {
  return (
    <>
      <AppReleaseListPage />
    </>
  );
};

export default AppReleaseNextPage;
