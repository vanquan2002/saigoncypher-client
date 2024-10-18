import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./ImageList";
import { formatCurrency } from "../../utils/formatCurrency";
import { useParams } from "react-router";
import { detailsProduct } from "../../redux/actions/ProductActions";
import Message from "../loadingError/Error";
import { addToCart } from "../../redux/actions/CartActions";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { AppContext } from "../../AppContext";
import RelatedProducts from "./RelatedProducts";
import { PiWarningCircleLight } from "react-icons/pi";
import Breadcrumbs from "../Breadcrumbs";
import { LiaStarSolid } from "react-icons/lia";
import { LiaStar } from "react-icons/lia";
import { CART_ADD_ITEM_RESET } from "../../redux/constants/CartConstants";
import MessageModal from "../modals/MessageModal";
import ProductDetailSkeleton from "../skeletons/ProductDetailSkeleton";
import AddCartSuccessModal from "../modals/AddCartSuccessModal";

const Contents = () => {
  const { id } = useParams();
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cart = useSelector((state) => state.cart);
  const { loading: loadingAddCart, success } = cart;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isDescriptionMore, setIsDescriptionMore] = useState(false);
  const [isSelectSize, setIsSelectSize] = useState(false);
  const {
    toggleIsMassage,
    isCartModal,
    toggleIsCartModal,
    toggleIsSmallModal,
  } = useContext(AppContext);
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Thông tin sản phẩm", url: "" },
  ];

  const increment = () => {
    setQty(qty + 1);
  };
  const decrement = () => {
    setQty(qty - 1);
  };

  const addToCartHandle = () => {
    if (size) {
      dispatch(addToCart(id, qty, size));
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
    setQty(1);
    setIsSelectSize(false);
    setIsDescriptionMore(false);
    dispatch(detailsProduct(id));
  }, [id]);

  useEffect(() => {
    if (success) {
      setSize("");
      setQty(1);
      dispatch({
        type: CART_ADD_ITEM_RESET,
      });
      if (window.innerWidth < 768) {
        toggleIsCartModal(false);
      }
      toggleIsSmallModal("cart");
    }
  }, [success]);

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
      <div className="mx-5 md:mx-0 mt-40 md:mt-28">
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
                  freeship.
                </span>
              </h1>
              <div className="grid grid-cols-3">
                <span className="lowercase col-span-1">Giá:</span>
                <p className="lowercase col-span-2 font-medium">
                  {formatCurrency(product.price)}.
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

                <div className="flex items-end justify-between mt-10">
                  <span className="lowercase text-sm">
                    Chọn hoặc nhập số lượng.
                  </span>
                  <div className="flex">
                    <button
                      type="button"
                      aria-label="Nhấn giảm số lượng đặt sản phẩm"
                      className={`${
                        qty <= 1 && "opacity-30 pointer-events-none"
                      } flex w-12 h-9 justify-center items-center border-t border-l border-b border-black hover:bg-gray-100`}
                      onClick={() => decrement()}
                    >
                      <AiOutlineMinus />
                    </button>
                    <input
                      aria-label="Ô hiển thị số lượng đặt sản phẩm"
                      className="w-12 h-9 text-lg text-center outline-none border border-black"
                      type="text"
                      value={qty}
                      readOnly
                    />
                    <button
                      type="button"
                      aria-label="Nhấn tăng số lượng đặt sản phẩm"
                      className={`${
                        qty >= 10 && "opacity-30 pointer-events-none"
                      } flex w-12 h-9 justify-center items-center border-t border-r border-b border-black hover:bg-gray-100`}
                      onClick={() => increment()}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Nhấn thêm vào giỏ hàng"
                  className={`w-full h-14 mt-5 duration-300 flex justify-center items-center border border-black hover:text-opacity-60 ${
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
      <AddCartSuccessModal />
    </main>
  );
};

export default Contents;
