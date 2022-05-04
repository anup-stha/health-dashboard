/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import isNaN from "lodash/isNaN";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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

    return string.replace(/_/g, " ");
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
    <ul className="flex items-center justify-center space-x-4 text-xl font-medium text-gray-400 h-full">
      <li className="hover:text-gray-800">
        <Link href="/dashboard">Dashboard</Link>
      </li>

      {breadcrumbs.map((breadcrumb, _i: number) => {
        return (
          <li
            key={breadcrumb.href}
            className={
              router.asPath === breadcrumb.href
                ? "text-black capitalize border-b-4 border-primary-500 h-full flex items-center box-content mt-1 px-4"
                : "capitalize hover:text-gray-800 -mt-1 px-4"
            }
          >
            <Link href={breadcrumb.href}>{decodeURI(breadcrumb.label).split("?")[0].replace(/_/g, " ")}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
