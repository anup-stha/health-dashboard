import { PROVINCE_DATA } from "@/lib/province";

export const useDistrict = (provinceWatch: keyof typeof PROVINCE_DATA) => {
  console.log(provinceWatch);

  return { districts: provinceWatch ? PROVINCE_DATA[provinceWatch].map((province) => province.district) : null };
};
