import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Breadcrumbs = ({ pageDescription }) => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const isLastElement = !keyword;

  return (
    <div className="mt-10 pl-5 md:pl-20 flex gap-2 uppercase">
      <span
        onClick={() => navigate("/")}
        className="text-sm text-gray-400 font-medium cursor-pointer hover:underline"
      >
        Trang chủ
      </span>

      {pageDescription && (
        <>
          <span
            className={`text-sm font-medium ${
              isLastElement ? "" : "text-gray-400"
            }`}
          >
            {"//"}
          </span>
          <span
            onClick={
              isLastElement ? null : () => navigate(`/${pageDescription.url}`)
            }
            className={`text-sm ${
              isLastElement
                ? "font-semibold"
                : "font-medium text-gray-400 cursor-pointer hover:underline"
            }`}
          >
            {pageDescription.name}
          </span>
        </>
      )}

      {keyword && (
        <>
          <span className="text-sm font-medium">{"//"}</span>
          <span className="text-sm font-semibold">{keyword}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
