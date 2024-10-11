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
    toggleIsBarRight("");
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [result]);

  useEffect(() => {
    document.title = result
      ? "Tìm kiếm sản phẩm"
      : "SaigonCypher | T-Shirt Store VietNam";
  }, [result]);

  return (
    <div
      className={`bg-white z-30 fixed top-0 right-0 duration-500 w-screen md:w-[500px] h-screen ${
        result ? "translate-x-0" : "translate-x-[100vw]"
      } `}
    >
      <div className="flex justify-between w-full items-center px-5 py-6">
        <span className="text-black font-medium uppercase">Tìm kiếm</span>
        <button
          type="button"
          aria-label="Đóng tìm kiếm"
          onClick={() => toggleIsBarRight("")}
        >
          <MdClose className="text-2xl md:text-3xl" />
        </button>
      </div>

      <form
        title="Form tìm kiếm sản phẩm"
        className="relative px-5 mt-4"
        onSubmit={(e) => submitHandle(e)}
      >
        <input
          ref={inputRef}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-5 pr-11 py-2 md:py-3 placeholder:text-[0.9rem] outline-none border border-black"
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          aria-label="Ô tìm kiếm sản phẩm"
          value={keyword}
          name="search"
        />
        <button
          type="submit"
          aria-label={`Tìm kiếm sản phẩm với từ khóa ${keyword}`}
        >
          <RiSearchLine className="text-xl md:text-[22px] absolute top-1/2 right-8 cursor-pointer transform -translate-y-1/2" />
        </button>
      </form>
    </div>
  );
};

export default SearchLayout;
