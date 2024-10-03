import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./ImageList";
import { formatCurrency } from "../../utils/formatCurrency";
import { useParams } from "react-router";
import { detailsProduct } from "../../redux/actions/ProductActions";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import RatingIconReadonly from "./RatingIconReadonly";
import { addToCart } from "../../redux/actions/CartActions";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import MessageModal from "../MessageModal";
import { AppContext } from "../../AppContext";
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts";
import { FaStar } from "react-icons/fa";

const Contents = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cart = useSelector((state) => state.cart);
  const { loading: loadingAddCart, success } = cart;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const { isMassage, toggleIsMassage, toggleIsBarRight } =
    useContext(AppContext);

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
    } else if (!size) {
      toggleIsMassage("size");
    } else if (qty === 0) {
      dispatch(addToCart(id, 1, size));
      setQty(1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setSize("");
    setQty(1);
    dispatch(detailsProduct(id));
  }, [id]);

  useEffect(() => {
    if (success) {
      setSize("");
      setQty(1);
      toggleIsBarRight("cart");
    }
  }, [success]);

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
          <div className="mt-10 flex flex-col md:flex-row gap-10 md:gap-5 lg:gap-20 ">
            <div className="w-full lg:w-2/5">
              <ImageList images={product.images} />
            </div>

            <div className="flex flex-col gap-[10px] w-full lg:w-3/5">
              <h5 className="uppercase line-clamp-2">{product.name}</h5>
              <div className="flex items-center gap-5 mt-[2px]">
                <div className="px-4 py-2 font-medium opacity-80 bg-gray-100">
                  <p>{formatCurrency(product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span>{"|"}</span>
                  <span>{product.numReviews} đánh giá</span>
                </div>
              </div>
              <div className="grid grid-cols-3 mt-4">
                <p className="uppercase col-span-1">Màu:</p>
                <p className="col-span-2">{product.color}</p>
              </div>
              <div className="grid grid-cols-3">
                <p className="col-span-1 uppercase">Mô tả:</p>
                <p className="col-span-2">{product.description}</p>
              </div>
              <div className="grid grid-cols-3">
                <p className="col-span-1 uppercase">Chính sách:</p>
                <p className="col-span-2">Đổi trả miễn phí trong 7 ngày</p>
              </div>
              <div className="grid grid-cols-3">
                <p className="col-span-1 uppercase">Vận chuyển:</p>
                <p className="col-span-2">
                  Giao hàng trong vòng 1 - 2 ngày tại TP. Hồ Chí Minh
                </p>
              </div>

              <div className="mt-8">
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes?.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSize(item.size)}
                      className={`cursor-pointer border-[1px] border-black flex items-center justify-center h-10 ${
                        item.size === size
                          ? "bg-black text-white"
                          : "text-black hover:bg-gray-100"
                      }`}
                    >
                      <span className="uppercase ">{item.size}</span>
                    </button>
                  ))}
                </div>

                <p className="cursor-pointer underline text-[13px] mt-2 text-gray-500 hover:text-black">
                  Hướng dẫn chọn size
                </p>

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
                  className={`w-full h-14 mt-5 duration-300 cursor-pointer flex justify-center items-center border border-black hover:text-opacity-60 ${
                    size ? "bg-black text-white" : "text-black"
                  } `}
                  onClick={() => addToCartHandle()}
                >
                  {loadingAddCart ? (
                    <span className="uppercase">Đang thêm vào giỏ...</span>
                  ) : (
                    <span className="uppercase">Thêm vào giỏ</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Reviews product={product} />
          <RelatedProducts productId={id} />
        </div>
      )}

      {isMassage === "size" && (
        <MessageModal message="Quý khách chưa chọn size!" />
      )}
    </div>
  );
};

export default Contents;
