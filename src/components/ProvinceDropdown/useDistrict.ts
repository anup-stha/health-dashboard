/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { PROVINCE_DATA } from "@/lib/province";

export const useDistrict = (provinceWatch: keyof typeof PROVINCE_DATA) => {
  return { districts: provinceWatch ? PROVINCE_DATA[provinceWatch]?.map((province) => province.district) : null };
};
