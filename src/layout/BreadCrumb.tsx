/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 1:13 PM
 *
 *
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import isNaN from "lodash/isNaN";

type pathArrayProps = {
  label: string;
  href: string;
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<pathArrayProps[]>([]);

  const removeBracesIfAny = (string: string) => {
    if (string[0] === "[" && string[string.length - 1] === "]") {
      return string.slice(1, -1);
    }

    return string.replaceAll("_", " ");
  };

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      const labelPath = router.pathname.split("/");

      linkPath.shift();
      labelPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          label: !isNaN(+path) ? removeBracesIfAny(labelPath[i]) : path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <ul className="flex items-center justify-center space-x-4 text-xl font-semibold text-gray-400 h-full">
      <li className="hover:text-gray-800">
        <Link href="/dashboard">Dashboard</Link>
      </li>

      {breadcrumbs.map((breadcrumb, _i: number) => {
        return (
          <li
            key={breadcrumb.href}
            className={
              router.asPath === breadcrumb.href
                ? "text-black capitalize border-b-4 border-green-500 h-full flex items-center box-content mt-1 px-4"
                : "capitalize hover:text-gray-800 -mt-1 px-4"
            }
          >
            <Link href={breadcrumb.href}>
              {decodeURI(breadcrumb.label).split("?")[0].replaceAll("_", " ")}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
