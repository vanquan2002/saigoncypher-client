import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { relatedProducts } from "./../../redux/actions/ProductActions";

const RelatedProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const productsRelated = useSelector((state) => state.productsRelated);
  const { loading, error, products } = productsRelated;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(relatedProducts(productId));
  }, [productId]);

  return (
    <div className="mt-40">
      <h6 className="uppercase font-medium">Sản phẩm liên quan</h6>
      {loading ? (
        <div className="mt-10">
          <Loading loading={loading} />
        </div>
      ) : error ? (
        <div className="mt-10">
          <Message error={error} />
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, i) => (
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
      )}
    </div>
  );
};

export default RelatedProducts;
