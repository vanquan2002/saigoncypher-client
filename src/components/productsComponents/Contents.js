import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { listProduct } from "../../redux/actions/ProductActions";

const Contents = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(listProduct(keyword, pageNumber));
  }, [keyword, pageNumber]);

  return (
    <div className="px-5 md:px-20">
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
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
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

          {products.length === 0 && (
            <span className="text-2xl uppercase">Không tìm thấy sản phẩm</span>
          )}

          <div className="flex items-center justify-center mt-20">
            <Pagination page={page} pages={pages} keyword={keyword} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contents;
