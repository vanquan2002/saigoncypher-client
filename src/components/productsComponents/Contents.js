import React, { useContext, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Message from "./../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { listProduct } from "../../redux/actions/ProductActions";
import { AppContext } from "../../AppContext";
import { LiaStarSolid } from "react-icons/lia";
import ProductListHomeSkeleton from "../skeletons/ProductListHomeSkeleton";
import Breadcrumbs from "../Breadcrumbs";
import { FaRegFaceMeh } from "react-icons/fa6";

const Contents = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const dispatch = useDispatch();
  const { numberColList } = useContext(AppContext);
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
  ];
  const updatedPages = useMemo(() => {
    if (keyword) {
      return [...namePages, { name: `${keyword}`, url: "" }];
    }
    return namePages;
  }, [keyword]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(listProduct(keyword, pageNumber));
  }, [keyword, pageNumber]);

  useEffect(() => {
    document.title = keyword
      ? `Tìm kiếm: ${keyword}`
      : "Saigoncypher - Tất cả sản phẩm";
  }, [keyword]);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-40 md:mt-28">
        <Breadcrumbs namePages={updatedPages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Tất cả sản phẩm.
      </h3>
      {loading ? (
        <ProductListHomeSkeleton numberColList={numberColList} />
      ) : error ? (
        <Message error={error} />
      ) : products.length > 0 ? (
        <div className="mt-5 md:mt-10">
          <section className="w-full">
            <ul
              className={`grid grid-cols-${numberColList} md:grid-cols-2 lg:grid-cols-4 ${
                numberColList === 2
                  ? "gap-x-[2px] gap-y-5 border-x-2 border-white"
                  : "gap-5"
              } md:gap-10`}
            >
              {products.map((product, i) => (
                <li key={i}>
                  <Link to={`/products/${product._id}/detail`}>
                    <img
                      className="w-full cursor-pointer"
                      src={product.thumbImage}
                      alt={`Hình ảnh của sản phẩm ${product.name}`}
                      title={`Nhấn để xem chi tiết về ${product.name}`}
                    />
                  </Link>
                  <div
                    className={`mt-1 ${
                      numberColList === 2 ? "px-2" : "px-[10px]"
                    } md:px-0`}
                  >
                    <Link to={`/products/${product._id}/detail`}>
                      <h2
                        className={`${
                          numberColList === 2 ? "text-base" : "text-[19px]"
                        } md:text-[19px] cursor-pointer line-clamp-1 hover:underline lowercase`}
                      >
                        {product.name}.
                      </h2>
                    </Link>
                    <div className="flex justify-between items-end">
                      <span
                        className={`${
                          numberColList === 2 ? "text-sm" : "text-base"
                        } md:text-base font-medium line-clamp-1 lowercase`}
                      >
                        {formatCurrency(product.price)}.
                      </span>
                      <div
                        className={`${
                          numberColList === 2 ? "text-sm" : "text-[15px]"
                        } md:text-[15px] flex items-center gap-[2px]`}
                      >
                        <LiaStarSolid />
                        <span>{product.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <div className="border-t border-gray-300 pt-5 md:pt-10 mt-5 md:mt-10 flex items-center justify-center">
            <Pagination page={page} pages={pages} keyword={keyword} />
          </div>
        </div>
      ) : products.length === 0 && keyword ? (
        <div className="mt-5 md:mt-10 mx-5 md:mx-0">
          <h5 className="lowercase mb-2 text-lg py-4 px-6 border border-black">
            Không tìm thấy sản phẩm!
          </h5>
          <span className="lowercase text-[15px]">
            Từ khóa tìm kiếm: <span>{keyword}</span>
          </span>
        </div>
      ) : (
        <div className="mt-5 md:mt-10 mx-5 md:mx-0">
          <h5 className="lowercase text-lg py-4 px-6 border border-black">
            Không có sản phẩm nào cả!
          </h5>
        </div>
      )}
    </main>
  );
};

export default Contents;
