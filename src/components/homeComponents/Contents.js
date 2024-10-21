import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./../../redux/actions/ProductActions";
import { LiaStarSolid } from "react-icons/lia";
import { AppContext } from "../../AppContext";
import { MdArrowOutward } from "react-icons/md";
import ProductListHomeSkeleton from "../skeletons/ProductListHomeSkeleton";

const Contents = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const { numberColList } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(listProduct());
  }, []);

  return (
    <main className="md:px-20">
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 text-center lowercase text-2xl md:text-3xl">
        Sản phẩm mới nhất.
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
              } md:gap-x-5 md:gap-y-8`}
            >
              {products.slice(0, 8).map((product, i) => (
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
                        {formatCurrency(product.price)}
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
          <div className="border-t border-gray-300 pt-5 md:pt-10 mt-5 md:mt-10 w-full flex justify-center">
            <Link
              to="/products"
              aria-label="Nhấn để đi đến trang tất cả sản phẩm"
              className="lowercase flex items-center hover:underline text-lg"
            >
              <span>Xem tất cả sản phẩm</span>
              <MdArrowOutward />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 md:mt-10 py-2 px-4 mx-5 md:mx-0 border border-black">
          <h5 className="lowercase">Không có sản phẩm nào cả!</h5>
        </div>
      )}
    </main>
  );
};

export default Contents;
