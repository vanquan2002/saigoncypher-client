import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ namePages }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-x-1 md:gap-x-2 lowercase line-clamp-1">
      {namePages.map((item, i) => (
        <div key={i} className="flex">
          {i !== 0 && (
            <span
              className={`text-sm pr-1 md:pr-2 ${
                namePages.length - 1 !== i
                  ? "text-gray-500"
                  : "font-semibold text-black"
              }`}
            >
              {"//"}
            </span>
          )}
          <span
            onClick={() => namePages.length - 1 !== i && navigate(item.url)}
            className={`text-sm ${
              namePages.length - 1 !== i
                ? "text-gray-500 cursor-pointer hover:underline"
                : "font-medium text-black line-clamp-1"
            }`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
