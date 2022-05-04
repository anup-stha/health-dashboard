/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

interface IHeadingProps {
  title: string;
  subtitle: string;
}

export const Heading = ({ title, subtitle }: IHeadingProps) => {
  return (
    <div>
      <h1 className="text-5xl font-medium text-gray-700">{title}</h1>
      <p className="text-lg text-gray-500">{subtitle}</p>
    </div>
  );
};
