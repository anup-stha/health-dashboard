/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:24 AM
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { TestPage } from "@/modules/tests";
import { useTestList } from "@/services/requests/testRequests";
import { NextPage } from "next";

const Tests: NextPage = () => {
  const { data: testListData } = useTestList();

  return <MainLayout>{testListData ? <TestPage /> : <div></div>}</MainLayout>;
};

export default withAuth(withRole(Tests));
