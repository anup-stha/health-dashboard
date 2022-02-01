/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/1/22, 4:47 PM
 *
 *
 */

interface IHeadingProps {
  title: string;
  subtitle: string;
}

export const Heading = ({ title, subtitle }: IHeadingProps) => {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-gray-850">{title}</h1>
      <p className="text-lg font-semibold text-gray-500">{subtitle}</p>
    </div>
  );
};
