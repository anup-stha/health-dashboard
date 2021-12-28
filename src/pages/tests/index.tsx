/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 3:24 PM
 *
 *
 */

import withAuth from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { TestPage } from "@/modules/tests";
import { NextPage } from "next";
import { useTestList } from "@/services/requests/testRequests";
import { Loader } from "@/components/Loader";

const Tests: NextPage = () => {
  const { isLoading: testLoading } = useTestList();

  return <MainLayout>{!testLoading ? <TestPage /> : <Loader />}</MainLayout>;
};

export default withAuth(withRole(Tests));
