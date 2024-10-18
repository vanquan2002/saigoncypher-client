import React, { useContext, useEffect } from "react";
import Message from "../loadingError/Error";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { relatedProducts } from "./../../redux/actions/ProductActions";
import ProductListHomeSkeleton from "../skeletons/ProductListHomeSkeleton";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";

const RelatedProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const productsRelated = useSelector((state) => state.productsRelated);
  const { loading, error, products } = productsRelated;
  const { numberColList } = useContext(AppContext);

  useEffect(() => {
    dispatch(relatedProducts(productId));
  }, [productId]);

  return (
    <div className="mt-40">
      <h3 className="mx-5 md:mx-0 lowercase text-xl font-medium">
        Sản phẩm liên quan.
      </h3>
      {loading ? (
        <ProductListHomeSkeleton numberColList={numberColList} />
      ) : error ? (
        <Message error={error} />
      ) : products.length > 0 ? (
        <section className="mt-5 md:mt-10 w-full">
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
      ) : (
        <div className="mt-5 md:mt-10 py-2 px-4 mx-5 md:mx-0 border border-black">
          <h5 className="lowercase">Không có sản phẩm nào cả!</h5>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
