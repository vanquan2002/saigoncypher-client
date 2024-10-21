import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./ImageList";
import { formatCurrency } from "../../utils/formatCurrency";
import { useParams } from "react-router";
import { detailsProduct } from "../../redux/actions/ProductActions";
import Message from "../loadingError/Error";
import { addToCart } from "../../redux/actions/CartActions";
import { AppContext } from "../../AppContext";
import RelatedProducts from "./RelatedProducts";
import { PiWarningCircleLight } from "react-icons/pi";
import Breadcrumbs from "../Breadcrumbs";
import { LiaStarSolid } from "react-icons/lia";
import { LiaStar } from "react-icons/lia";
import { CART_ADD_ITEM_RESET } from "../../redux/constants/CartConstants";
import MessageModal from "../modals/MessageModal";
import ProductDetailSkeleton from "../skeletons/ProductDetailSkeleton";
import SmallModal from "../modals/SmallModal";

const Contents = () => {
  const { id } = useParams();
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cart = useSelector((state) => state.cart);
  const { loading: loadingAddCart, successType } = cart;
  const [size, setSize] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isDescriptionMore, setIsDescriptionMore] = useState(false);
  const [isSelectSize, setIsSelectSize] = useState(false);
  const {
    toggleIsMassage,
    isCartModal,
    toggleIsCartModal,
    isSmallModal,
    toggleIsSmallModal,
  } = useContext(AppContext);
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Thông tin sản phẩm", url: "" },
  ];

  const addToCartHandle = () => {
    toggleIsSmallModal("");
    if (size) {
      dispatch(addToCart(id, 1, size, 1));
    } else {
      if (window.innerWidth < 768) {
        setIsSelectSize(true);
      } else {
        toggleIsMassage("size");
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setSize("");
    setIsSelectSize(false);
    setIsDescriptionMore(false);
    dispatch(detailsProduct(id));
  }, [id]);

  useEffect(() => {
    if (successType === 1) {
      setSize("");
      dispatch({
        type: CART_ADD_ITEM_RESET,
      });
      if (window.innerWidth < 768) {
        toggleIsCartModal(false);
      }
      toggleIsSmallModal("add_item_cart");
    }
  }, [successType]);

  useEffect(() => {
    const handleResize = () => {
      const descriptionElement = descriptionRef.current;
      if (descriptionElement) {
        const computedStyle = window.getComputedStyle(descriptionElement);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const totalHeight = descriptionElement.scrollHeight;
        const lines = Math.round(totalHeight / lineHeight);
        const isOverflowing = lines > 3;
        setIsOverflowing(isOverflowing);
      }
      toggleIsCartModal(false);
      setIsSelectSize(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [product]);

  useEffect(() => {
    if (size && window.innerWidth < 768) {
      setIsSelectSize(false);
    }
  }, [size]);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      {loading ? (
        <ProductDetailSkeleton />
      ) : error ? (
        <Message error={error} />
      ) : (
        <article>
          <div className="mt-5 md:mt-10 flex flex-col lg:flex-row gap-4 md:gap-10 lg:gap-20">
            <section className="w-full lg:w-2/5">
              <ImageList images={product.images} />
            </section>

            <section className="px-5 md:px-0 flex flex-col gap-[10px] w-full lg:w-3/5">
              <h1 className="lowercase text-2xl font-medium">
                {product.name}.{" "}
                <span className="bg-yellow-400 text-black text-xs font-medium px-1.5 py-1">
                  freeship tp.<span className="uppercase">hcm</span>.
                </span>
              </h1>
              <div className="grid grid-cols-3">
                <span className="lowercase col-span-1">Giá:</span>
                <p className="lowercase col-span-2 font-medium">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="grid grid-cols-3">
                <span className="lowercase col-span-1">Màu:</span>
                <p className="lowercase col-span-2">{product.color}.</p>
              </div>
              <div className="grid grid-cols-3">
                <span className="lowercase col-span-1">Mô tả:</span>
                <div className="flex flex-col items-start col-span-2">
                  <p
                    ref={descriptionRef}
                    className={`lowercase ${
                      isDescriptionMore ? "line-clamp-none" : "line-clamp-3"
                    }`}
                  >
                    {product.description}.
                  </p>

                  {isOverflowing && (
                    <button
                      type="button"
                      className="underline"
                      onClick={() => setIsDescriptionMore(!isDescriptionMore)}
                    >
                      {isDescriptionMore ? "Rút gọn" : "Xem thêm"}
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <span className="lowercase col-span-1">Chính sách:</span>
                <p className="lowercase col-span-2">
                  Đổi trả miễn phí trong 7 ngày.
                </p>
              </div>
              <div className="grid grid-cols-3">
                <span className="lowercase col-span-1">Đánh giá:</span>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-[2px]">
                    <LiaStarSolid />
                    <span>{product.rating}/5</span>
                  </div>
                  <span>({product.numReviews} lượt)</span>
                </div>
              </div>

              <div
                className={`w-full ${
                  isCartModal ? "block z-30 p-5" : "hidden"
                } md:block mt-8 bg-white w-full fixed left-0 bottom-0 md:static`}
              >
                <ul className="grid grid-cols-2 gap-3">
                  {product.sizes?.map((item, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        aria-label={`Nhấn chọn size ${item.size}`}
                        onClick={() => setSize(item.size)}
                        className={`text-lg border border-black flex w-full items-center justify-center h-10 ${
                          item.size === size
                            ? "bg-black text-white"
                            : "text-black hover:bg-gray-100"
                        }`}
                      >
                        <span className="lowercase">{item.size}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-2">
                  {isSelectSize && (
                    <div className="flex items-center gap-1">
                      <PiWarningCircleLight className="text-red-500" />
                      <span className="md:hidden text-[13px] text-red-500">
                        Qúy khách chưa chọn size!
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    className="lowercase underline text-[13px]"
                  >
                    Hướng dẫn chọn size.
                  </button>
                </div>

                <button
                  type="button"
                  aria-label="Nhấn thêm vào giỏ hàng"
                  className={`w-full h-14 mt-10 duration-300 flex justify-center items-center border border-black hover:text-opacity-60 ${
                    size ? "bg-black text-white" : "text-black"
                  }`}
                  onClick={() => addToCartHandle()}
                >
                  {loadingAddCart ? (
                    <span className="lowercase text-lg">
                      Đang thêm vào giỏ...
                    </span>
                  ) : (
                    <span className="lowercase text-lg">Thêm vào giỏ.</span>
                  )}
                </button>
              </div>
            </section>
          </div>

          {/*  <Reviews product={product} /> */}
          <RelatedProducts productId={id} />
        </article>
      )}

      <MessageModal message="Quý khách chưa chọn size!" />
      <SmallModal
        result={isSmallModal === "add_item_cart"}
        text="Thêm vào giỏ hàng thành công!"
      />
    </main>
  );
};

export default Contents;
