/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import moment from "moment";

export const epochToDate = (epochInSec: number) => moment(epochInSec * 1000).format("MMMM Do, YYYY");
