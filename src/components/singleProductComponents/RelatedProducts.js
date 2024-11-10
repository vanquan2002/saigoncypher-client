import React, { useEffect } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { relatedProducts } from "./../../redux/actions/ProductActions";
import { Link } from "react-router-dom";
import ProductListSkeleton from "../skeletons/ProductListSkeleton";
import Error from "../loadingError/Error";

const RelatedProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const productsRelated = useSelector((state) => state.productsRelated);
  const { loading, error, products } = productsRelated;

  useEffect(() => {
    dispatch(relatedProducts(productId));
  }, [productId]);

  return (
    <section className="md:px-5 mt-40">
      <h3 className="mx-5 md:mx-0 lowercase text-xl font-medium">
        Sản phẩm liên quan.
      </h3>
      {loading ? (
        <div className="mt-5 md:mt-10">
          <ProductListSkeleton numberColList={2} />
        </div>
      ) : error ? (
        <div className="mt-5 md:mt-10">
          <Error error={error} />
        </div>
      ) : products.length > 0 ? (
        <div className="mt-5 md:mt-10 w-full">
          <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[2px] gap-y-5 border-x-2 border-white md:gap-x-4 md:gap-y-8">
            {products.map((product, i) => (
              <li key={i}>
                <Link to={`/products/${product._id}/detail`}>
                  <img
                    className="w-full cursor-pointer"
                    src={product.thumbImage}
                    alt={`Hình ảnh của sản phẩm ${product.name}`}
                    title={`Xem chi tiết ${product.name}`}
                  />
                </Link>
                <div className="mt-1 md:mt-2 flex flex-col md:gap-0.5 px-2 md:px-0">
                  <Link to={`/products/${product._id}/detail`}>
                    <h2 className="cursor-pointer line-clamp-1 hover:underline lowercase">
                      {product.name}.
                    </h2>
                  </Link>
                  <span className="text-sm">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h5 className="lowercase text-gray-600 text-lg py-4 px-6 mt-5 md:mt-10 border-y md:border border-gray-300">
          Không có sản phẩm liên quan!
        </h5>
      )}
    </section>
  );
};

export default RelatedProducts;
