import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { relatedProducts } from "./../../redux/actions/ProductActions";
import { Link } from "react-router-dom";
import ProductListSkeleton from "../skeletons/ProductListSkeleton";
import Error from "../loadingError/Error";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const RelatedProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const productsRelated = useSelector((state) => state.productsRelated);
  const { loading, error, products } = productsRelated;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numPerSlide, setNumPerSlide] = useState(0);

  const prevHandle = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const nextHandle = () => {
    if (currentIndex + numPerSlide < products.length)
      setCurrentIndex(currentIndex + 1);
  };
  const updateItemCount = () => {
    if (window.innerWidth >= 1024) {
      setNumPerSlide(4);
    } else {
      setNumPerSlide(2);
    }
  };

  useEffect(() => {
    if (productId) {
      setCurrentIndex(0);
      dispatch(relatedProducts(productId));
    }
  }, [productId]);

  useEffect(() => {
    updateItemCount();
    window.addEventListener("resize", updateItemCount);
    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  return (
    <section className="md:px-5 mt-20">
      <h3 className="px-5 md:px-0 lowercase text-xl font-medium">
        Có thể bạn cũng thích.
      </h3>
      {loading ? (
        <div className="mt-5 md:mt-10">
          <ProductListSkeleton numberColList={2} />
        </div>
      ) : error ? (
        <div className="px-5 md:px-0 mt-5 md:mt-10">
          <Error error={error} />
        </div>
      ) : products.length > 0 ? (
        <div className="mt-5 md:mt-10 px-7 md:px-4 relative">
          <button
            onClick={prevHandle}
            className={`absolute z-[5] left-4 md:left-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-8 md:h-10 w-8 md:w-10 rounded-full bg-white border border-neutral-200 ${
              currentIndex <= 0
                ? "opacity-30 cursor-default"
                : "opacity-100 hover:bg-neutral-200"
            } duration-300`}
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl md:text-3xl" />
          </button>

          <div className="overflow-hidden">
            <ul
              className="flex duration-300"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / numPerSlide)
                }%)`,
              }}
            >
              {products.map((product, i) => (
                <li
                  className="flex-shrink-0 w-1/2 lg:w-1/4 px-[1px] md:px-1"
                  key={i}
                >
                  <Link to={`/product/${product.slug}`}>
                    <img
                      className="w-full cursor-pointer"
                      src={product.thumbImage}
                      alt={`Hình ảnh của sản phẩm ${product.name}`}
                      title={`Xem chi tiết ${product.name}`}
                    />
                  </Link>
                  <div className="mt-1 md:mt-2 flex flex-col md:gap-0.5 px-2 md:px-0">
                    <Link to={`/product/${product.slug}`}>
                      <h2 className="cursor-pointer line-clamp-1 hover:underline lowercase">
                        {product.name}
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

          <button
            onClick={nextHandle}
            className={`absolute z-[5] right-4 md:right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-8 md:h-10 w-8 md:w-10 rounded-full bg-white border border-neutral-200 ${
              currentIndex + numPerSlide >= products.length
                ? "opacity-30 cursor-default"
                : "opacity-100 hover:bg-neutral-200"
            } duration-300`}
          >
            <MdOutlineKeyboardArrowRight className="text-2xl md:text-3xl" />
          </button>
        </div>
      ) : (
        <h5 className="lowercase text-neutral-600 mt-5 md:mt-10 px-5 md:px-0">
          Không có sản phẩm liên quan!
        </h5>
      )}
    </section>
  );
};

export default RelatedProducts;
