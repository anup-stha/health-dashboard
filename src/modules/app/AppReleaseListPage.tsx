/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { useRouter } from "next/router";
import React from "react";

import { PageContainer } from "@/components/Container";
import { Loader } from "@/components/Loader";

import { AppReleaseCard } from "@/modules/app/components/AppReleaseCard";
import { AppReleaseModal } from "@/modules/app/components/AppReleaseModal";
import { AppQuery } from "@/modules/app/hooks/AppQuery";
import { AppReleaseQuery } from "@/modules/app/hooks/AppReleaseQuery";

/**
 *
 * @return {JSX.Element}
 */
export function AppReleaseListPage() {
  const router = useRouter();

  const { data, isLoading } = AppQuery.useGetList();
  const selectedApp = data?.find((app) => app.id === Number(router.query.id));

  const { data: appReleaseList, isLoading: appReleaseListLoading } = AppReleaseQuery.useGetList(
    selectedApp ? selectedApp.id : 0
  );

  if (isLoading || appReleaseListLoading) return <Loader />;

  return (
    <PageContainer>
      <div>
        <h1 className="text-4xl font-medium text-gray-700 ">{selectedApp?.name}</h1>
        <p className="text-xl font-normal tracking-wide text-gray-500">{selectedApp?.application_id}</p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-12 mt-2">
        {appReleaseList?.map((app) => (
          <AppReleaseCard
            key={app.id}
            id={app.id}
            name={app.name}
            code={app.code}
            note={app.note}
            version={app.version}
            app_url={app.app_url}
          />
        ))}
        <AppReleaseModal type="add" />
      </div>
    </PageContainer>
  );
}
