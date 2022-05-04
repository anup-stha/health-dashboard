/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useEffect } from "react";
import { Control, UseFormResetField, UseFormWatch } from "react-hook-form";

import { PROVINCE_DATA } from "@/lib/province";

import Dropdown from "@/components/Dropdown";
import { useCities } from "@/components/ProvinceDropdown/useCities";
import { useDistrict } from "@/components/ProvinceDropdown/useDistrict";

type FormValues = {
  [key: string]: any;
};

type ProvinceDropdownProps = {
  control: Control;
  watch: UseFormWatch<FormValues>;
  resetField: UseFormResetField<FormValues>;
  province_name?: string;
  district_name?: string;
  city_name?: string;
};

export const ProvinceDropdown = ({
  control,
  watch,
  resetField,
  province_name = "province",
  district_name = "district",
  city_name = "city",
}: ProvinceDropdownProps) => {
  const provinceWatch = watch(province_name) as keyof typeof PROVINCE_DATA;
  const districtWatch = watch(district_name);
  const cityWatch = watch(city_name);

  const provinceOptions = Object.keys(PROVINCE_DATA);
  const { districts } = useDistrict(provinceWatch);
  const { cities } = useCities(provinceWatch, districtWatch);

  useEffect(() => {
    districtWatch && resetField("district");
    cityWatch && resetField("city");
  }, [provinceWatch]);

  useEffect(() => {
    cityWatch && resetField("city");
  }, [districtWatch]);

  return (
    <>
      <Dropdown name={province_name} label="Province" control={control} options={provinceOptions} />
      <Dropdown
        name={district_name}
        label="District"
        control={control}
        options={districts}
        noOptionMessage="Please select Province first"
      />
      <Dropdown
        name={city_name}
        label="City"
        control={control}
        options={cities}
        noOptionMessage="Please select District first"
      />
    </>
  );
};
