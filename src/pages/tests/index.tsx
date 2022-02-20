/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/23/22, 9:17 PM
 *
 *
 */

import { NextPage } from "next";
import React from "react";

import { Loader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import { TestPage } from "@/modules/tests";
import { useTestList } from "@/services/requests/testRequests";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const Tests: NextPage = () => {
  const { isLoading: testLoading } = useTestList();

  return (
    <>
      <MainHead title="Tests" />
      {!testLoading ? <TestPage /> : <Loader />}
    </>
  );
};

export default withAuth(withRole(Tests));
