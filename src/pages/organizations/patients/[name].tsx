/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/4/22, 2:37 PM
 *
 */

import { DoctorModule } from "@/modules/doctor";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const OrganizationNextPatientPage = () => {
  return <DoctorModule.PatientDetailPage />;
};

export default withAuth(withRole(OrganizationNextPatientPage));
