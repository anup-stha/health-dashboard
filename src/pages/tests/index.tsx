/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 9:32 PM
 *
 *
 */

import withAuth from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { TestPage } from "@/modules/tests";
import { NextPage } from "next";
import { useTestList } from "@/services/requests/testRequests";

const Tests: NextPage = () => {
  const { isLoading: testLoading } = useTestList();

  return (
    <MainLayout>
      {!testLoading ? <TestPage /> : <div className=""></div>}
    </MainLayout>
  );
};

export default withAuth(withRole(Tests));
