/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/6/22, 12:11 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { TestDetails } from "@/modules/tests/testDetails";
import { testStore } from "@/modules/tests/testStore";
import { getTests } from "@/services/requests/testRequests";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/router";
import { MainHead } from "@/layout/MainHead";

const Test: NextPage<any> = () => {
  const router = useRouter();
  const idX = router.query.test;
  const { setSelectedTest, setTestList, setLoading, loading } = testStore();

  useEffect(() => {
    const listTestFn = async () => {
      setLoading(true);
      if (!idX) return;
      await getTests()
        .then((res) => {
          setTestList(res.data.data);
          setSelectedTest(res.data.data.filter((test) => test.slug === idX)[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    listTestFn();
  }, [idX]);

  return (
    <>
      <MainHead title={`Test - ${router.query["test"]}`} />
      <MainLayout>{!loading ? <TestDetails /> : <Loader />}</MainLayout>
    </>
  );
};

export default withAuth(withRole(Test));
