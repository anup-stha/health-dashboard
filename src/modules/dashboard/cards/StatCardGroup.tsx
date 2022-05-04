/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Box2, Buildings, ChemicalGlass, Health, People, Profile2User, SecurityUser } from "iconsax-react";
import React from "react";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { StatCard } from "@/modules/dashboard/cards/StatCard";
import { StatCardApp } from "@/modules/dashboard/cards/StatCardApp";
import { StatCardRect } from "@/modules/dashboard/cards/StatCardRect";

type StatCardGroupProps = {
  data: any;
};

export const StatCardGroup: React.FC<StatCardGroupProps> = ({ data }) => {
  return (
    <div className="gap-6 h-auto grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-4">
      <StatCard
        icon={
          <div className="bg-purple-600 p-8 rounded-full">
            <ChemicalGlass variant="Broken" size={36} color="#fff" />
          </div>
        }
        value={data.total_tests}
        valueText="Total Tests"
      />
      <StatCard
        icon={
          <div className="bg-orange-600 p-8 rounded-full">
            <Profile2User variant="Broken" size={36} color="#fff" />{" "}
          </div>
        }
        value={data.total_members}
        valueText="Total Members"
      />{" "}
      <StatCard
        icon={
          <div className="bg-yellow-600 p-8 rounded-full">
            <Buildings variant="Broken" size={36} color="#fff" />{" "}
          </div>
        }
        value={data.organization}
        valueText="Total Organizations"
      />
      <StatCard
        icon={
          <div className="bg-emerald-600 p-8 rounded-full">
            <Box2 variant="Broken" size={36} color="#fff" />{" "}
          </div>
        }
        value={data.total_subscription}
        valueText="Total Subscriptions"
      />
      <StatCard
        icon={
          <div className="bg-blue-600 p-8 rounded-full">
            <SecurityUser variant="Broken" size={36} color="#fff" />{" "}
          </div>
        }
        value={data.total_users}
        valueText="Total Users"
      />
    </div>
  );
};
export const OrgStatCardGroup: React.FC<StatCardGroupProps> = ({ data }) => {
  return (
    <div className="gap-6 h-auto grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-4">
      <StatCard
        icon={
          <div className="bg-orange-600 p-8 rounded-full">
            <Profile2User variant="Broken" size={36} color="#fff" />{" "}
          </div>
        }
        value={data?.total_members}
        valueText="Total Members"
      />
      <StatCard
        icon={
          <div className="bg-blue-600 p-8 rounded-full">
            <SecurityUser variant="Broken" size={36} color="#fff" />{" "}
          </div>
        }
        value={data?.total_patient}
        valueText="Total Patients"
      />
    </div>
  );
};

export const StatCardGroupVariant2: React.FC<StatCardGroupProps> = ({ data }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={`w-full  grid ${user?.id ? "grid-cols-2" : ""} gap-6 lg:grid-cols-1 sm:gap-4`}>
      <div className={`flex ${user?.id ? "flex-col" : ""}   gap-6 h-full`}>
        <StatCardRect
          icon={
            <div className="bg-lime-600 p-8 rounded-full">
              <Health variant="Broken" size={36} color="#fff" />
            </div>
          }
          value={data.total_test_taken}
          valueText={["Total Test Count", "Total Tests taken through Sunya Apps"]}
        />
        <StatCardRect
          icon={
            <div className="bg-slate-700 p-8 rounded-full">
              <People size={36} color="#fff" variant="Broken" />
            </div>
          }
          value={data.organization_operator}
          valueText={["Organization Operators", "Total Operators added by Organizations"]}
        />
      </div>
      {user?.id === 1 ? <StatCardApp /> : null}
    </div>
  );
};
