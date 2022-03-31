import { PROVINCE_DATA } from "@/lib/province";

export const useDistrict = (provinceWatch: keyof typeof PROVINCE_DATA) => {
  return { districts: provinceWatch ? PROVINCE_DATA[provinceWatch]?.map((province) => province.district) : null };
};
