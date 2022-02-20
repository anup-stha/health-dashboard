/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:18 PM
 *
 *
 */

import React from "react";

import { Loader } from "@/components/Loader";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import {
  OrgStatCardGroup,
  StatCardGroup,
  StatCardGroupVariant2,
} from "@/modules/dashboard/cards/StatCardGroup";
import { useDashboardQuery } from "@/modules/dashboard/hooks/useDashboardQuery";
import { WelcomeModal } from "@/modules/dashboard/modal/WelcomeModal";
import { UnVerifiedModal } from "@/modules/org-admin/dashboard/UnVerifiedModal";
import { useRoleList } from "@/services/requests/roleRequests";

export const orgAdminWelcomeSlides = [
  {
    link: "/assets/image-slider-3.svg",
    pos: 1,
    title: "Hello",
    subtitle:
      "Please press continue to see more of your Dashboard. You will get to know how you can use your dashboard.",
  },
  {
    link: "https://sunya-bucket.s3.us-west-2.amazonaws.com/assets/howtouse/welcome-1.svg",
    pos: 2,
    title: "Organization Members",
    subtitle:
      "Press on members tab on left side to view different kinds of members associated with your organization",
  },
  {
    link: "https://sunya-bucket.s3.us-west-2.amazonaws.com/assets/howtouse/welcome-2.svg",
    pos: 3,
    title: "Organization Roles",
    subtitle:
      "Click on any role to view members associated with that role. You currently can view operators and patients",
  },
  {
    link: "https://sunya-bucket.s3.us-west-2.amazonaws.com/assets/howtouse/welcome-3.svg",
    pos: 4,
    title: "Organization Patients",
    subtitle:
      "After clicking on patients, you get a list of patients. Click on the green button to add patients. Click on patient to view more details of that patient",
  },
  {
    link: "https://sunya-bucket.s3.us-west-2.amazonaws.com/assets/howtouse/welcome-4.svg",
    pos: 5,
    title: "Add Patient",
    subtitle:
      "Click on Add Patient on Right Side of The Screen to add the basic details of a patient. Fill up the form and submit it.",
  },
  {
    link: "https://sunya-bucket.s3.us-west-2.amazonaws.com/assets/howtouse/welcome-5.svg",
    pos: 6,
    title: "Patient Details",
    subtitle:
      "On the right side, you can control everything about patients such as updating details, adding medical history and others. Below you can check for patient's test history and other details",
  },
  {
    link: "https://sunya-bucket.s3.us-west-2.amazonaws.com/assets/howtouse/welcome-6.svg",
    pos: 7,
    title: "More Patient Details",
    subtitle:
      "You can scroll down more to see more details related to patient and see more tests ",
  },
];

export const OrgAdminDashboard = () => {
  const { user } = useAuthStore();
  useRoleList();
  const { data, isLoading, error } = useDashboardQuery();

  if (isLoading || error) return <Loader />;

  return (
    <div className="px-10 -mt-2 pb-8 sm:p-6 space-y-8 w-full dashboard-bg-2">
      {user.verified || user.id === 1 ? null : <UnVerifiedModal />}

      <div>
        <h1 className="text-[2.5rem] text-gray-800 font-semibold ">
          Hello, {user.name}
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Welcome Back To Dashboard!
        </p>
      </div>

      <div className="w-full flex items-start gap-6 md:flex-col relative sm:gap-4">
        <div className="w-5/6 h-full flex flex-col gap-6 md:w-full md:gap-4">
          {user.id === 1 ? (
            <StatCardGroup data={data} />
          ) : (
            <OrgStatCardGroup data={data} />
          )}

          <StatCardGroupVariant2 data={data} />
        </div>
      </div>
      <WelcomeModal images={orgAdminWelcomeSlides} />
    </div>
  );
};
