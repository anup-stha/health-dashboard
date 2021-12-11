/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { TestPage } from "@/modules/tests";
import { testStore } from "@/modules/tests/testStore";
import { listTest } from "@/services/requests/testRequests";
import { NextPage } from "next";
import { useEffect } from "react";

const Tests: NextPage = () => {
  const { setTestList, setLoading } = testStore();

  useEffect(() => {
    const listTestFn = async () => {
      setLoading(true);
      await listTest()
        .then((res) => {
          console.log(res);
          setLoading(false);
          setTestList(res.data.data);
        })
        .catch(() => setLoading(false));
    };
    listTestFn();
  }, []);
  return (
    <MainLayout>
      <TestPage />
    </MainLayout>
  );
};

export default withAuth(withRole(Tests));
