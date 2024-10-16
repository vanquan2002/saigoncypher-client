import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./ImageList";
import { formatCurrency } from "../../utils/formatCurrency";
import { useParams } from "react-router";
import { detailsProduct } from "../../redux/actions/ProductActions";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { addToCart } from "../../redux/actions/CartActions";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import MessageModal from "../MessageModal";
import { AppContext } from "../../AppContext";
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts";
import { PiWarningCircleLight } from "react-icons/pi";
import Breadcrumbs from "../Breadcrumbs";
import { LiaStarSolid } from "react-icons/lia";
import { LiaStar } from "react-icons/lia";
import { IoPricetagsSharp } from "react-icons/io5";

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
    isMassage,
    toggleIsMassage,
    toggleIsBarRight,
    isCartModal,
    toggleIsCartModal,
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
  const setInputQtyHandle = (num) => {
    if (num !== "" && !isNaN(num) && num > 0 && num <= 20) {
      setQty(parseInt(num));
    } else {
      setQty(0);
    }
  };
  const addToCartHandle = () => {
    if (size && qty) {
      dispatch(addToCart(id, qty, size));
    }
    if (size && qty === 0) {
      dispatch(addToCart(id, 1, size));
      setQty(1);
    }
    if (!size) {
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
      toggleIsBarRight("cart");
      if (window.innerWidth < 768) {
        toggleIsCartModal();
      }
    }
  }, [success]);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      const computedStyle = window.getComputedStyle(descriptionElement);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const totalHeight = descriptionElement.scrollHeight;
      const lines = Math.round(totalHeight / lineHeight);
      const isOverflowing = lines > 3;
      setIsOverflowing(isOverflowing);
    }
  }, [product]);

  useEffect(() => {
    if (size) {
      setIsSelectSize(false);
    }
  }, [size]);

  return (
    <main className="px-5 md:px-20">
      <div className="mt-40 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      {loading ? (
        <div className="mt-10">
          <Loading loading={loading} />
        </div>
      ) : error ? (
        <div className="mt-10">
          <Message error={error} />
        </div>
      ) : (
        <article>
          <div className="mt-10 flex flex-col lg:flex-row gap-5 md:gap-10 lg:gap-20">
            <section className="w-full lg:w-2/5">
              <ImageList images={product.images} />
            </section>

            <section className="flex flex-col gap-[10px] w-full lg:w-3/5">
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
                <div className="flex flex-col items-start col-span-2 bg-gray-50 py-[1px] px-[6px]">
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
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-[2px]">
                  <LiaStarSolid />
                  <span>{product.rating}/5</span>
                </div>
                <span>({product.numReviews} đánh giá)</span>
              </div>

              <div
                className={`${
                  isCartModal ? "block z-30 p-5" : "hidden"
                } md:block mt-8 bg-white w-full fixed left-0 bottom-0 md:static`}
              >
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes?.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSize(item.size)}
                      className={`cursor-pointer border border-black flex items-center justify-center h-10 ${
                        item.size === size
                          ? "bg-black text-white"
                          : "text-black hover:bg-gray-100"
                      }`}
                    >
                      <span className="uppercase ">{item.size}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  {isSelectSize && (
                    <div className="flex items-center gap-1">
                      <PiWarningCircleLight className="text-red-500" />
                      <span className="md:hidden text-[13px] text-red-600">
                        Qúy khách chưa chọn size!
                      </span>
                    </div>
                  )}
                  <span className="cursor-pointer underline text-[13px]">
                    Hướng dẫn chọn size
                  </span>
                </div>

                <div className="flex items-end justify-between mt-10">
                  <p className="text-sm">Chọn hoặc nhập số lượng</p>
                  <div className="flex">
                    <button
                      className={`${
                        qty <= 1 && "opacity-30 pointer-events-none"
                      } flex cursor-pointer w-12 h-9 justify-center items-center border-t border-l border-b border-black hover:bg-gray-100`}
                      onClick={() => decrement()}
                    >
                      <AiOutlineMinus color="#1c1c1c" size="1rem" />
                    </button>
                    <input
                      className="w-12 h-9 text-lg text-center outline-none border border-black"
                      type="text"
                      onChange={(e) => setInputQtyHandle(e.target.value)}
                      value={qty}
                    />
                    <button
                      className={`${
                        qty >= 20 && "opacity-30 pointer-events-none"
                      } flex cursor-pointer w-12 h-9 justify-center items-center border-t border-r border-b border-black hover:bg-gray-100`}
                      onClick={() => increment()}
                    >
                      <AiOutlinePlus color="#1c1c1c" size="1rem" />
                    </button>
                  </div>
                </div>

                <button
                  className={`w-full h-14 mt-5 duration-300 flex justify-center items-center border border-black hover:text-opacity-60 ${
                    size ? "bg-black text-white" : "text-black"
                  }`}
                  onClick={() => addToCartHandle()}
                >
                  {loadingAddCart ? (
                    <span className="uppercase">Đang thêm vào giỏ...</span>
                  ) : (
                    <span className="uppercase">Thêm vào giỏ</span>
                  )}
                </button>
              </div>
            </section>
          </div>

          <Reviews product={product} />
          <RelatedProducts productId={id} />
        </article>
      )}

      {isMassage === "size" && (
        <MessageModal message="Quý khách chưa chọn size!" />
      )}
    </main>
  );
};

export default Contents;
