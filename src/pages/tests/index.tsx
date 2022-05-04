/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
