import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";

type paginationProps = {
  totalPageNumber: number;
  pageIndex: number;
  setPageIndex: any;
};

export const Pagination = ({
  totalPageNumber,
  pageIndex,
  setPageIndex,
}: paginationProps): JSX.Element => {
  // Pagination States for Handling Form Input and UI
  const [pageArray, setPageArray] = useState([1, 2, 3, 4, 5]);
  const [enteredPage, setEnteredPage] = useState<number>(1);

  // Incase props are not mentioned. Used for storybook
  const [pageDIndex, setPageDIndex] = useState(1);
  pageIndex = !pageIndex ? pageDIndex : pageIndex;
  setPageIndex = !setPageIndex ? setPageDIndex : setPageIndex;

  const leftClickHandler = () => {
    if (pageIndex <= 1) {
      setPageIndex(1);
      return;
    }
    setPageIndex(pageIndex - 1);
  };

  const rightClickHandler = () => {
    if (pageIndex >= totalPageNumber) {
      setPageIndex(totalPageNumber);
      return;
    }
    setPageIndex(pageIndex + 1);
  };

  useEffect(() => {
    const page = +pageIndex;
    if (page < 1) {
      setPageIndex(1);
      return;
    }
    setPageIndex(+pageIndex);

    if (totalPageNumber <= 4) {
      setPageArray(() => {
        const tempPageArray = [];
        for (let i = 1; i <= totalPageNumber; i++) tempPageArray.push(i);
        return tempPageArray;
      });
      return;
    }

    if (page > 3 && page < totalPageNumber - 3)
      setPageArray([page - 2, page - 1, page, page + 1, page + 2]);
    else if (page <= 3)
      setPageArray([page, page + 1, page + 2, page + 3, page + 4]);
    else setPageArray([page - 4, page - 3, page - 2, page - 1, page]);
  }, [pageIndex, totalPageNumber]);

  return (
    <div className="flex items-center justify-center mx-auto my-4 leading-6 text-gray-800">
      <div className="flex items-center px-2 py-1 space-x-8 text-lg font-bold rounded-xl sm:space-x-4 sm:flex-col sm:space-y-4 sm:px-0 sm:text-2xl">
        <ul className="flex items-center space-x-2 sm:space-x-2">
          <li>
            <button className="button-nav" onClick={leftClickHandler}>
              <ArrowLeft />
            </button>
          </li>

          {pageArray.map((page) => (
            <li
              key={page}
              className={pageIndex !== page ? "inactive_item" : "active_item"}
              onClick={() => setPageIndex(page)}
            >
              {page}
            </li>
          ))}

          <li>
            <button className="button-nav" onClick={rightClickHandler}>
              <ArrowRight />
            </button>
          </li>
        </ul>
        <form
          className="flex items-center space-x-4 text-gray-600 sm:text-2xl"
          onSubmit={(e) => {
            e.preventDefault();

            if (enteredPage && enteredPage <= 1) {
              setEnteredPage(1);
              setPageIndex(1);

              return;
            }
            if (enteredPage && enteredPage >= totalPageNumber) {
              setEnteredPage(totalPageNumber);
              setPageIndex(totalPageNumber);
              return;
            }
            setPageIndex(enteredPage);
          }}
        >
          <div>Go To Page</div>
          <input
            onChange={(e) => {
              setEnteredPage(+e.target.value);
            }}
            type="number"
            value={enteredPage}
            className="bg-gray-100 border-2 border-gray-600 rounded-lg shadow-inner px-xs py-xs w-3xl"
          />
          <button className="flex items-center font-bold cursor-pointer hover:text-gray-800">
            <span>Go</span>
          </button>
        </form>
      </div>
    </div>
  );
};
