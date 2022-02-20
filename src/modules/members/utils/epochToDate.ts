/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 11:12 AM
 *
 *
 */

import moment from "moment";

export const epochToDate = (epochInSec: number) =>
  moment(epochInSec * 1000).format("MMMM Do, YYYY");
