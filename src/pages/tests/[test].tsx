/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 7:48 PM
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
import { useEffect } from "react";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/router";

const Test: NextPage<any> = () => {
  const router = useRouter();
  const idX = router.query.test;
  const { setSelectedTest, setTestList, setLoading, loading } = testStore();

  useEffect(() => {
    const listTestFn = async () => {
      setLoading(true);
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

  return <MainLayout>{!loading ? <TestDetails /> : <Loader />}</MainLayout>;
};

export default withAuth(withRole(Test));
