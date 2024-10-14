import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./../../redux/actions/ProductActions";
import { LiaStarSolid } from "react-icons/lia";
import { LiaStar } from "react-icons/lia";
import { AppContext } from "../../AppContext";

const Contents = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const { numberColList } = useContext(AppContext);

  useEffect(() => {
    dispatch(listProduct());
  }, []);

  return (
    <main className="md:px-20">
      {loading ? (
        <div className="mt-10">
          <Loading loading={loading} />
        </div>
      ) : error ? (
        <div className="mt-10">
          <Message error={error} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-center w-ful">
            <span className="uppercase text-2xl md:text-3xl font-medium">
              Sản phẩm mới nhất
            </span>
          </div>
          <section className="w-full mt-5 md:mt-10">
            <ul
              className={`grid grid-cols-${numberColList} md:grid-cols-2 lg:grid-cols-4 ${
                numberColList === 2
                  ? "gap-x-[2px] gap-y-5 border-x-2 border-white"
                  : "gap-5"
              } md:gap-10 duration-300`}
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
                    className={`${
                      numberColList === 2 ? "mt-1 px-2" : "mt-[6px] px-[10px]"
                    }  md:px-0`}
                  >
                    <Link to={`/products/${product._id}/detail`}>
                      <h2
                        className={`${
                          numberColList === 2 ? "text-base" : "text-lg"
                        } cursor-pointer line-clamp-1 hover:underline`}
                      >
                        {product.name}
                      </h2>
                    </Link>
                    <div className="flex justify-between items-end gap-2">
                      <span
                        className={`${
                          numberColList === 2 ? "text-sm" : "text-base"
                        } font-medium line-clamp-1`}
                      >
                        {formatCurrency(product.price)}
                      </span>
                      <div
                        className={`${
                          numberColList === 2 ? "text-sm" : "text-base"
                        } flex items-center gap-[3px]`}
                      >
                        <LiaStarSolid />
                        <span>
                          {product.rating}
                          {"/5"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <Link
            to="/products"
            aria-label="Nhấn để đi đến trang tất cả sản phẩm"
            className="uppercase text-sm mt-8 md:mt-10 cursor-pointer hover:underline font-medium"
          >
            {"["} Xem tất cả sản phẩm {"]"}
          </Link>
        </div>
      )}
    </main>
  );
};

export default Contents;
