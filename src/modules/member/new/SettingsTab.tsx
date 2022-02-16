/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 8:49 PM
 *
 *
 */

import React from "react";

/**
 *
 * @constructor
 */
export function SettingsTab() {
  return (
    <div className="bg-white w-full rounded-2xl shadow-sm p-8 flex flex-col relative">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
            <p className="text-gray-500 font-medium text-lg print:hidden">
              Edit your profile and other things here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
