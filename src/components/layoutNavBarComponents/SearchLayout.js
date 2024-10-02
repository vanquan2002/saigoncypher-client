import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { AppContext } from "../../AppContext";

const SearchLayout = ({ result }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { toggleIsBarRight } = useContext(AppContext);

  const submitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
    } else {
      navigate(`/products`);
    }
    toggleIsBarRight("");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [result]);

  return (
    <div
      className={`bg-white z-30 fixed top-0 right-0 duration-500 ${
        result ? "translate-x-0" : "translate-x-[100vw]"
      } `}
    >
      <div className="w-screen md:w-[500px] h-screen">
        <div className="flex justify-between w-full items-center px-5 py-6">
          <p className="text-black font-medium uppercase">Search</p>
          <MdClose
            onClick={() => toggleIsBarRight("")}
            size="1.7rem"
            className="cursor-pointer"
          />
        </div>

        <form className="relative px-5 mt-2" onSubmit={(e) => submitHandle(e)}>
          <input
            ref={inputRef}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-5 pr-10 py-3 placeholder:text-[0.9rem] outline-none border border-black"
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={keyword}
          />
          <RiSearchLine
            onClick={(e) => submitHandle(e)}
            size="1.3rem"
            className="absolute top-1/2 right-8 cursor-pointer transform -translate-y-1/2"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchLayout;
