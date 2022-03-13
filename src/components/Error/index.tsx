/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/19/22, 10:00 AM
 *
 *
 */

import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface IErrorStateProps {
  title: string;
  subtitle?: string;
  image?: string;
  height?: `h-${string}`;
  containerClassName?: string;
}

/**
 *
 * @param {string} title
 * @param {string} subtitle
 * @param {string}image
 * @param {string} height - Tailwind height class
 * @param {string} containerClassName
 * @return {JSX.Element}
 */
export function ErrorState({
  title,
  subtitle,
  image,
  height,
  containerClassName,
}: IErrorStateProps) {
  return (
    <div
      className={clsx({
        "flex flex-col justify-start py-32 items-center gap-4":
          !containerClassName,
        containerClassName: !!containerClassName,
      })}
    >
      <div
        className={clsx("object-contain w-full relative", {
          "h-32": !height,
          height: !!height,
        })}
      >
        <Image
          src={image ?? "/assets/not-found.svg"}
          alt="Empty State"
          layout="fill"
          objectFit="contain"
          priority={true}
        />{" "}
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-medium text-primary-600">{title}</div>
        <div className="text-lg font-medium text-primary_gray-500">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
