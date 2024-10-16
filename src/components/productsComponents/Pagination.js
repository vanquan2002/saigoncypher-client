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
      <div className="flex justify-center items-center gap-3">
        <button
          type="button"
          onClick={() => handlePageClick(Math.max(1, page - 1))}
          className={`text-black text-lg font-medium ${
            page === 1 && "text-opacity-30 pointer-events-none"
          } `}
        >
          prev.
        </button>
        <div className="flex items-center gap-3">
          {Array.from({ length: pages }, (_, x) => x + 1).map((x) => (
            <button
              type="button"
              key={x + 1}
              onClick={() => handlePageClick(x)}
              className={`flex items-center justify-center font-medium text-lg px-2 w-[26px] h-[26px] ${
                x === page && "bg-gray-100"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => handlePageClick(Math.min(pages, page + 1))}
          className={`text-black text-lg font-medium ${
            page === pages && "text-opacity-30 pointer-events-none"
          }`}
        >
          next.
        </button>
      </div>
    )
  );
};

export default Pagination;
