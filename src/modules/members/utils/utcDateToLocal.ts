/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 8:55 PM
 *
 *
 */

import { utcToZonedTime } from "date-fns-tz";

export const utcDateToLocal = (date: Date) => {
  // eslint-disable-next-line new-cap
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    return utcToZonedTime(new Date(date).getTime() * 1000, timezone).toLocaleString();
  } catch {
    return "Not Available";
  }
};
