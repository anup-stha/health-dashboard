/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/2/22, 8:04 AM
 *
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
