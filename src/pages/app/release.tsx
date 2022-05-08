/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { NextPage } from "next";

import { AppReleaseListPage } from "@/modules/app/AppReleaseListPage";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const AppReleaseNextPage: NextPage = () => {
  return (
    <>
      <AppReleaseListPage />
    </>
  );
};

export default withAuth(withRole(AppReleaseNextPage));
