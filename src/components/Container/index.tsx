/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 3:25 PM
 *
 */

import React from "react";

interface IPageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: IPageContainerProps) => {
  return <div className="px-10 py-10 overflow-visible sm:p-6 space-y-6">{children}</div>;
};
