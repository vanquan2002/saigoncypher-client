import React from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ page, pages, keyword }) => {
  const navigate = useNavigate();

  const handlePageClick = (newPage) => {
    const route = keyword
      ? `/products/search/${keyword}/page/${newPage}`
      : `/products/page/${newPage}`;
    navigate(route);
  };
  return (
    pages > 1 && (
      <div className="flex justify-center items-center gap-1 mt-5">
        <p
          onClick={() => handlePageClick(Math.max(1, page - 1))}
          className={`${
            page !== 1
              ? "hover:text-opacity-60 duration-200 mr-2 text-darkPrimary font-medium cursor-pointer"
              : "opacity-30 pointer-events-none"
          } `}
        >
          prev
        </p>
        {Array.from({ length: pages }, (_, x) => x + 1).map((x) => (
          <div
            key={x + 1}
            onClick={() => handlePageClick(x)}
            className="hover:text-opacity-60 duration-200 flex justify-center w-7 text-lg text-darkPrimary cursor-pointer"
          >
            <p className={`font-medium ${x === page && "underline"}`}>{x}</p>
          </div>
        ))}
        <p
          onClick={() => handlePageClick(Math.min(pages, page + 1))}
          className={`${
            page !== pages
              ? "hover:text-opacity-60 duration-200 ml-2 text-darkPrimary font-medium cursor-pointer"
              : "opacity-30 pointer-events-none"
          }`}
        >
          next
        </p>
      </div>
    )
  );
};

export default Pagination;
