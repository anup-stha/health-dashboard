/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/24/22, 3:57 PM
 *
 *
 */

import { NextPage } from "next";
import { MemberListPage } from "@/modules/member";
import { useRoleList } from "@/services/requests/roleRequests";
import { Loader } from "@/components/Loader";

const MemberPage: NextPage = () => {
  const { isLoading } = useRoleList();

  return !isLoading ? <MemberListPage /> : <Loader />;
};

export default MemberPage;
