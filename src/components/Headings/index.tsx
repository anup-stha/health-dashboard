/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 10:03 AM
 *
 *
 */

type SectionHeadingProps = {
  children: React.ReactNode;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return <h2 className="text-3xl font-semibold text-gray-900">{children}</h2>;
};

export default SectionHeading;
