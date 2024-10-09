import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./../../redux/actions/ProductActions";
import { LiaStarSolid } from "react-icons/lia";
import { LiaStar } from "react-icons/lia";

const Contents = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(listProduct());
  }, []);

  return (
    <main className="mt-20 px-2 md:px-20">
      {loading ? (
        <div className="mt-10">
          <Loading loading={loading} />
        </div>
      ) : error ? (
        <div className="mt-10">
          <Message error={error} />
        </div>
      ) : (
        <section>
          <h2 className="text-center uppercase text-xl md:text-3xl font-medium">
            Sản phẩm mới nhất
          </h2>
          <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-10">
            {products.slice(0, 8).map((product, i) => (
              <li key={i}>
                <Link to={`/products/${product._id}/detail`}>
                  <img
                    className="w-full cursor-pointer"
                    src={product.thumbImage}
                    alt={`Hình ảnh của sản phẩm ${product.name}`}
                    title={`Nhấp vào để xem chi tiết về ${product.name}`}
                  />
                </Link>
                <div className="mt-1 px-1 md:px-0">
                  <Link to={`/products/${product._id}/detail`}>
                    <h3 className="cursor-pointer uppercase line-clamp-1 hover:underline text-xs md:text-sm font-medium">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center ">
                    <p className="font-medium text-xs md:text-sm">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex items-center gap-1">
                      <LiaStarSolid className="text-xs md:text-sm" />
                      <span className="text-xs md:text-sm">
                        {product.rating}
                        {"/5"}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-10">
            <Link
              to="/products"
              aria-label="Truy cập trang tất cả sản phẩm"
              className="cursor-pointer hover:underline font-medium text-xs md:text-sm uppercase"
            >
              {"["} Xem tất cả sản phẩm {"]"}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default Contents;
