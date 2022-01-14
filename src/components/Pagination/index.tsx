/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 10:21 AM
 *
 *
 */

/* eslint-disable require-jsdoc */
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useRouter } from "next/router";
import { PaginationObject } from "@/types";

type paginationProps = {
  totalPageNumber: number;
  pageIndex: number;
  setPageIndex: any;
  pageName?: string;
  paginateObject?: PaginationObject;
};

export const Pagination = ({
  totalPageNumber,
  pageIndex,
  setPageIndex,
  pageName,
}: paginationProps): JSX.Element => {
  // Pagination States for Handling Form Input and UI
  const [pageArray, setPageArray] = useState([1, 2, 3, 4, 5]);
  const [enteredPage, setEnteredPage] = useState<number | "">(1);
  const router = useRouter();

  // Incase props are not mentioned. Used for storybook
  const [pageDIndex, setPageDIndex] = useState(1);
  pageIndex = !pageIndex ? pageDIndex : pageIndex;
  setPageIndex = !setPageIndex ? setPageDIndex : setPageIndex;

  const leftClickHandler = () => {
    if (pageIndex <= 1) {
      setPageIndex(1);
      router.push(
        {
          query: { ...router.query, page: 1 },
        },
        undefined,
        { shallow: true }
      );
      return;
    }
    setPageIndex(pageIndex - 1);
    router.push(
      {
        query: { ...router.query, page: pageIndex - 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const rightClickHandler = () => {
    if (pageIndex >= totalPageNumber) {
      setPageIndex(totalPageNumber);
      router.push(
        {
          query: { ...router.query, page: totalPageNumber },
        },
        undefined,
        { shallow: true }
      );

      return;
    }
    setPageIndex(pageIndex + 1);
    router.push(
      {
        query: { ...router.query, page: pageIndex + 1 },
      },
      undefined,
      { shallow: true }
    );
  };
  useEffect(() => {
    const page = +pageIndex;
    if (page < 1) {
      setPageIndex(1);
      return;
    }
    setPageIndex(+pageIndex);

    if (totalPageNumber <= 6) {
      setPageArray(() => {
        const tempPageArray = [];
        for (let i = 1; i <= totalPageNumber; i++) tempPageArray.push(i);
        return tempPageArray;
      });
      return;
    }

    if (page > 3 && page <= totalPageNumber - 3)
      setPageArray([page - 2, page - 1, page, page + 1, page + 2]);
    else if (page <= 4)
      setPageArray([page, page + 1, page + 2, page + 3, page + 4]);
    else setPageArray([page - 4, page - 3, page - 2, page - 1, page]);
  }, [pageIndex, totalPageNumber, setPageIndex]);

  return (
    <div className="flex items-center justify-center mx-auto leading-6 text-gray-800">
      <div className="flex items-center px-2 py-1 space-x-8 text-lg font-bold rounded-xl sm:space-x-2 sm:flex-col sm:space-y-4 sm:px-0 sm:text-xl">
        <ul className="flex items-center space-x-2 sm:space-x-2">
          <li>
            <button
              className="button-nav"
              onClick={leftClickHandler}
              disabled={pageIndex === 1}
            >
              <ArrowLeft />
            </button>
          </li>

          {pageArray.map((page) => (
            <li
              key={page}
              className={pageIndex !== page ? "inactive_item" : "active_item"}
              onClick={() => {
                router.push(
                  {
                    query: { ...router.query, page: +page },
                  },
                  undefined,
                  { shallow: true }
                );
                setPageIndex(page);
              }}
            >
              {page}
            </li>
          ))}

          <li>
            <button
              className="button-nav"
              disabled={pageIndex === totalPageNumber}
              onClick={rightClickHandler}
            >
              <ArrowRight />
            </button>
          </li>
        </ul>
        <form
          className="flex items-center space-x-4 text-gray-500 sm:text-xl"
          onSubmit={(e) => {
            e.preventDefault();

            if (enteredPage && enteredPage <= 1) {
              setEnteredPage(1);
              setPageIndex(1);
              router.push(
                {
                  query: { ...router.query, page: 1 },
                },
                undefined,
                { shallow: true }
              );

              return;
            }
            if (enteredPage && enteredPage >= totalPageNumber) {
              setEnteredPage(totalPageNumber);
              setPageIndex(totalPageNumber);
              router.push(
                {
                  query: { ...router.query, page: totalPageNumber },
                },
                undefined,
                { shallow: true }
              );

              return;
            }
            setPageIndex(enteredPage);
          }}
        >
          <div>Go To Page</div>
          <input
            onChange={(e) => {
              if (+e.target.value === 0) {
                setEnteredPage("");
                return;
              }
              setEnteredPage(+e.target.value);
            }}
            type="number"
            value={enteredPage.toString()}
            className="bg-gray-100 rounded-lg shadow-sm ring-1 ring-gray-500/50 text-center px-4 py-xs w-14"
          />
          <button className="flex items-center font-bold cursor-pointer hover:text-gray-800">
            <span>Go</span>
          </button>
        </form>
      </div>
    </div>
  );
};
