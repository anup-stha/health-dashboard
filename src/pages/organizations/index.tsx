/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/3/22, 1:30 PM
 *
 */

import React from "react";

import { DoctorModule } from "@/modules/doctor";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const DoctorOrganizationListPage = () => {
  return <DoctorModule.OrganizationListPage />;
};

export default withAuth(withRole(DoctorOrganizationListPage));
