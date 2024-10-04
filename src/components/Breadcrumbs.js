import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ namePages }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 pl-5 md:pl-20 flex flex-wrap uppercase">
      {namePages.map((item, i) => (
        <p key={i}>
          {i !== 0 && (
            <span
              className={`pr-2 ${
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
            className={`text-sm font-medium pr-2 ${
              namePages.length - 1 !== i
                ? "text-gray-500 cursor-pointer hover:underline"
                : "font-semibold text-black"
            }`}
          >
            {item.name}
          </span>
        </p>
      ))}
    </div>
  );
};

export default Breadcrumbs;
