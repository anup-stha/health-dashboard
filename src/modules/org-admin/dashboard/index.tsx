/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/11/22, 3:58 PM
 *
 *
 */

import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useRoleList } from "@/services/requests/roleRequests";
import { WelcomeModal } from "@/modules/dashboard/modal/WelcomeModal";

export const orgAdminWelcomeSlides = [
  {
    link: "/assets/image-slider-3.svg",
    pos: 1,
    title: "Hello",
    subtitle:
      "Please press continue to see more of your Dashboard. You will get to know how you can use your dashboard.",
  },
  {
    link: "/assets/welcome-1.svg",
    pos: 2,
    title: "Organization Members",
    subtitle:
      "Press on members tab on left side to view different kinds of members associated with your organization",
  },
  {
    link: "/assets/welcome-2.svg",
    pos: 3,
    title: "Organization Roles",
    subtitle:
      "Click on any role to view members associated with that role. You currently can view operators and patients",
  },
  {
    link: "/assets/welcome-3.svg",
    pos: 4,
    title: "Organization Patients",
    subtitle:
      "After clicking on patients, you get a list of patients. Click on the green button to add patients. Click on patient to view more details of that patient",
  },
  {
    link: "/assets/welcome-4.svg",
    pos: 5,
    title: "Add Patient",
    subtitle:
      "Click on Add Patient on Right Side of The Screen to add the basic details of a patient. Fill up the form and submit it.",
  },
  {
    link: "/assets/welcome-5.svg",
    pos: 6,
    title: "Patient Details",
    subtitle:
      "On the right side, you can control everything about patients such as updating details, adding medical history and others. Below you can check for patient's test history and other details",
  },
  {
    link: "/assets/welcome-6.svg",
    pos: 7,
    title: "More Patient Details",
    subtitle:
      "You can scroll down more to see more details related to patient and see more tests ",
  },
];

export const OrgAdminDashboard = () => {
  const { user } = useAuthStore();
  const {} = useRoleList();

  return (
    <div className="px-10 -mt-2 pb-8 sm:p-6 space-y-8 w-full dashboard-bg-2">
      <div>
        <h1 className="text-[2.5rem] text-gray-800 font-semibold ">
          Hello, {user.name}
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Welcome Back To Dashboard!
        </p>
      </div>
      <WelcomeModal images={orgAdminWelcomeSlides} />
    </div>
  );
};
