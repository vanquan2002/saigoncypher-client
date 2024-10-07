import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./../../redux/actions/ProductActions";

const Contents = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(listProduct());
  }, []);

  return (
    <main className="px-2 md:px-20">
      <h1 className="font-black my-52 text-4xl md:text-5xl lg:text-7xl text-center uppercase">
        Áo thun thời trang
        <span className="inline-block">Saigonsimple</span>
      </h1>
      {loading ? (
        <div className="mt-10">
          <Loading loading={loading} />
        </div>
      ) : error ? (
        <div className="mt-10">
          <Message error={error} />
        </div>
      ) : (
        <div>
          <section>
            <h2 className="text-center uppercase">Sản phẩm mới nhất</h2>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-10">
              {products.slice(0, 8).map((product, i) => (
                <div key={i}>
                  <Link to={`/products/${product._id}/detail`}>
                    <img
                      className="w-full cursor-pointer"
                      src={product.thumbImage}
                      alt={`Hình ảnh của sản phẩm ${product.name}`}
                      title={`Nhấp vào để xem chi tiết về ${product.name}`}
                    />
                  </Link>
                  <div className="mt-1">
                    <Link
                      to={`/products/${product._id}/detail`}
                      className="cursor-pointer uppercase line-clamp-1 hover:underline text-xs md:text-sm font-medium"
                    >
                      <h3>{product.name}</h3>
                    </Link>
                    <span className="bg-black text-sm text-white px-2 py-1">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center mt-10 md:mt-20">
            <Link
              to="/products"
              aria-label="Đi đến trang tất cả sản phẩm"
              title="Truy cập trang tất cả sản phẩm"
              className="cursor-pointer hover:underline font-semibold text-sm"
            >
              {"["} Xem tất cả sản phẩm {"]"}
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Contents;
