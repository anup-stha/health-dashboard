/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/3/22, 8:02 PM
 *
 *
 */

import React from "react";

import { PageContainer } from "@/components/Container";
import { Heading } from "@/components/Headings";
import { Loader } from "@/components/Loader";

import { AppAddEditModal } from "@/modules/app/components/AppAddModal";
import { AppCard } from "@/modules/app/components/AppCard";
import { AppQuery } from "@/modules/app/hooks/AppQuery";

export const AppListPage = () => {
  const { data, isLoading } = AppQuery.useGetList();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <Heading title="App Builds" subtitle="List of All App List Releases" />
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-between gap-12 mt-2">
        {data?.map((app) => (
          <AppCard
            id={app.id}
            key={app.id}
            name={app.name}
            slug={app.slug}
            application_id={app.application_id}
            secret_key={app.secret_key}
          />
        ))}
        <AppAddEditModal type="add" />
      </div>
    </PageContainer>
  );
};
