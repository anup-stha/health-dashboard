/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import type { NextPage } from "next";
import Image from "next/image";

import withAuth from "@/shared/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";

import error from "../styles/404.svg";

const Statistics: NextPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-[80vh]">
        <Image src={error} alt="Error" />
      </div>
    </MainLayout>
  );
};

export default withAuth(Statistics);
