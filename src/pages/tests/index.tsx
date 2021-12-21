/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:24 A
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { TestPage } from "@/modules/tests";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { listTests } from "@/services/requests/testRequests";

const Tests: NextPage = () => {
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    const getTests = async () => {
      setTestLoading(true);
      await listTests()
        .then(() => setTestLoading(false))
        .catch(() => setTestLoading(false));
    };
    getTests();
  }, []);
  return (
    <MainLayout>
      {!testLoading ? <TestPage /> : <div className=""></div>}
    </MainLayout>
  );
};

export default withAuth(withRole(Tests));
