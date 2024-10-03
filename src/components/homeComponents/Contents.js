import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "./../../redux/actions/ProductActions";

const Contents = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(listProduct());
  }, []);

  return (
    <div className="px-5 md:px-20">
      <h2 className="mt-16 text-center uppercase">Sản phẩm mới nhất</h2>

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
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.slice(0, 8).map((product, i) => (
              <div className="" key={i}>
                <img
                  onClick={() => navigate(`/products/${product._id}/detail`)}
                  className="w-full cursor-pointer"
                  src={product.thumbImage}
                  alt={`Hình ảnh của ${product.name}`}
                  title={product.name}
                />
                <div>
                  <h6
                    onClick={() => navigate(`/products/${product._id}/detail`)}
                    className="cursor-pointer uppercase truncate hover:underline"
                  >
                    {product.name}
                  </h6>
                  <p className="text-sm font-medium">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-20">
            <button
              onClick={() => navigate("/products")}
              className="cursor-pointer"
            >
              <span className="hover:underline font-semibold text-sm text-darkPrimary">
                [ Xem tất cả sản phẩm ]
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contents;
