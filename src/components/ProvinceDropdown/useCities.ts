import { PROVINCE_DATA } from "@/lib/province";

export const useCities = (province: keyof typeof PROVINCE_DATA, district: string) => {
  return {
    cities:
      province && district ? PROVINCE_DATA[province].find((data) => data.district === district)?.cities ?? null : null,
  };
};
