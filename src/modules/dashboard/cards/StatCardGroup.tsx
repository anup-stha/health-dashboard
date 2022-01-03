/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 12:37 PM
 *
 *
 */

import { StatCard } from "@/modules/dashboard/cards/StatCard";
import {
  Box2,
  Buildings,
  ChemicalGlass,
  Profile2User,
  SecurityUser,
} from "iconsax-react";
import React from "react";
import { StatCardRect } from "@/modules/dashboard/cards/StatCardRect";
import Image from "next/image";
import { StatCardApp } from "@/modules/dashboard/cards/StatCardApp";

type StatCardGroupProps = {
  data: any;
};

export const StatCardGroup: React.FC<StatCardGroupProps> = ({ data }) => {
  return (
    <div className="gap-6 h-auto grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-4">
      <StatCard
        icon={
          <div className="bg-purple-600 p-8 rounded-full">
            <ChemicalGlass variant="Broken" size={36} color={"#fff"} />
          </div>
        }
        value={data.total_tests}
        valueText={"Total Tests"}
      />
      <StatCard
        icon={
          <div className="bg-orange-600 p-8 rounded-full">
            <Profile2User variant="Broken" size={36} color={"#fff"} />{" "}
          </div>
        }
        value={data.total_members}
        valueText={"Total Members"}
      />{" "}
      <StatCard
        icon={
          <div className="bg-yellow-600 p-8 rounded-full">
            <Buildings variant="Broken" size={36} color={"#fff"} />{" "}
          </div>
        }
        value={data.organization}
        valueText={"Total Organizations"}
      />
      <StatCard
        icon={
          <div className="bg-emerald-600 p-8 rounded-full">
            <Box2 variant="Broken" size={36} color={"#fff"} />{" "}
          </div>
        }
        value={data.total_subscription}
        valueText={"Total Subscriptions"}
      />
      <StatCard
        icon={
          <div className="bg-blue-600 p-8 rounded-full">
            <SecurityUser variant="Broken" size={36} color={"#fff"} />{" "}
          </div>
        }
        value={data.total_users}
        valueText={"Total Users"}
      />
    </div>
  );
};

export const StatCardGroupVariant2: React.FC<StatCardGroupProps> = ({
  data,
}) => {
  return (
    <div className="w-full grid-cols-2 grid gap-6 lg:grid-cols-1 sm:gap-4">
      <div className="flex flex-col gap-6 h-full">
        <StatCardRect
          icon={
            <div className=" h-28 w-28 relative flex-shrink-0">
              <Image
                src={"/sub_test.png"}
                layout="fill"
                objectFit="cover"
                alt="Profile"
              />
            </div>
          }
          value={data.total_test_taken}
          valueText={["Total Tests", "Total Tests taken through Sunya Apps"]}
        />
        <StatCardRect
          icon={
            <div className=" h-28 w-28 relative flex-shrink-0">
              <Image
                src={"/assets/management.png"}
                layout="fill"
                objectFit="cover"
                alt="Profile"
              />
            </div>
          }
          value={data.organization_operator}
          valueText={[
            "Organization Operators",
            "Total Operators added by Organizations",
          ]}
        />
      </div>
      <StatCardApp />
    </div>
  );
};
