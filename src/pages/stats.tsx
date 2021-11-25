import type { NextPage } from "next";
import Image from "next/image";

import withAuth from "@/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";

import error from "../styles/404.svg";

const Statistics: NextPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-[80vh]">
        <Image src={error} />
      </div>
    </MainLayout>
  );
};

export default withAuth(Statistics);
