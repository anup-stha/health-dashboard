/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { NextPage } from "next";

import { AppListPage } from "@/modules/app/AppListPage";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const AppBuildNextPage: NextPage = () => {
  return (
    <>
      <AppListPage />
    </>
  );
};

export default withAuth(withRole(AppBuildNextPage));
