/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/28/22, 6:05 PM
 *
 *
 */

import React from "react";

interface IPageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: IPageContainerProps) => {
  return <div className="px-10 py-10 overflow-visible sm:p-6 space-y-6">{children}</div>;
};
