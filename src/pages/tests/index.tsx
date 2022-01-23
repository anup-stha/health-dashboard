/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/23/22, 9:17 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { TestPage } from "@/modules/tests";
import { NextPage } from "next";
import { useTestList } from "@/services/requests/testRequests";
import { Loader } from "@/components/Loader";
import React from "react";
import { MainHead } from "@/layout/MainHead";

const Tests: NextPage = () => {
  const { isLoading: testLoading } = useTestList();

  return (
    <>
      <MainHead title={`Tests`} />
      {!testLoading ? <TestPage /> : <Loader />}
    </>
  );
};

export default withAuth(withRole(Tests));
