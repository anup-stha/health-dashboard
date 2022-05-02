/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { PROVINCE_DATA } from "@/lib/province";

export const useCities = (province: keyof typeof PROVINCE_DATA, district: string) => {
  return {
    cities:
      province && district ? PROVINCE_DATA[province]?.find((data) => data.district === district)?.cities ?? null : null,
  };
};
