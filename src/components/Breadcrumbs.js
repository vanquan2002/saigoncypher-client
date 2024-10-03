import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ namePages }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 pl-5 md:pl-20 flex uppercase">
      {namePages.map((item, i) => (
        <div className="flex items-center" key={i}>
          <p
            onClick={() =>
              namePages.length - 1 !== i && navigate(`${item.url}`)
            }
            className={`${
              namePages.length - 1 !== i
                ? "text-gray-500 cursor-pointer hover:underline"
                : "font-semibold text-black "
            } text-sm font-medium `}
          >
            {item.name}
          </p>
          {namePages.length - 1 !== i && (
            <span
              className={`${
                namePages.length - 2 !== i ? "text-gray-500 " : "text-black "
              } px-1 text-sm font-semibold`}
            >
              {"//"}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
