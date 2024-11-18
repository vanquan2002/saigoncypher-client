import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { MdClose } from "react-icons/md";
import { addToCart, removeFromCart } from "../../redux/actions/CartActions";
import Breadcrumbs from "../Breadcrumbs";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { CART_ADD_ITEM_RESET } from "../../redux/constants/CartConstants";
import { AppContext } from "../../AppContext";
import SmallModal from "../modals/SmallModal";
import debounce from "lodash.debounce";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Contents = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, successType } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const quantity = cartItems.reduce((a, i) => a + i.qty, 0);
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Giỏ hàng", url: "" },
  ];
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);
  const [typeModal, setTypeModal] = useState("");

  const removeFromCartHandle = (id, size) => {
    if (isSmallModal) {
      toggleIsSmallModal("");
    }
    if (typeModal) {
      setTypeModal("");
    }
    dispatch(removeFromCart(id, size, 2));
  };

  const debouncedChangeQtyProduct = useMemo(
    () =>
      debounce((slug, qty, size, type) => {
        dispatch(addToCart(slug, qty, size, type));
      }, 200),
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (successType === 2) {
      toggleIsSmallModal("Xóa khỏi giỏ hàng thành công!");
      setTypeModal("remove_item_cart");
      dispatch({
        type: CART_ADD_ITEM_RESET,
      });
    }
  }, [successType]);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Giỏ hàng của bạn.
      </h3>
      {cartItems.length === 0 ? (
        <h4 className="mt-5 md:mt-10 lowercase text-lg">
          <span className="ml-5 md:ml-0">Giỏ hàng của bạn đang trống!</span>
        </h4>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 mt-5 md:mt-10 md:border-l border-t border-gray-300">
          {cartItems.map((item, i) => (
            <li
              key={i}
              className={`flex items-center ${
                cartItems.length > i && "md:border-r border-b border-gray-300"
              }`}
            >
              <Link
                to={`/product/${item.slug}`}
                className="w-1/3 md:w-1/5 lg:w-1/4"
              >
                <img
                  className="w-full"
                  src={item.thumbImage}
                  alt={`Hình ảnh của ${item.name}`}
                  title={item.name}
                />
              </Link>

              <div className="w-2/3 md:w-4/5 lg:w-3/4 flex flex-col justify-between h-full py-3 px-4 md:p-5">
                <div className="flex flex-col gap-1">
                  <div className="w-full flex justify-between items-start">
                    <Link to={`/product/${item.slug}`}>
                      <h2 className="lowercase text-lg font-medium leading-6 line-clamp-2 hover:underline">
                        {item.name}
                      </h2>
                    </Link>
                    <button
                      type="button"
                      aria-label={`Xóa sản phẩm ${item.name} - ${item.size} khỏi giỏ hàng`}
                      onClick={() =>
                        removeFromCartHandle(item.product, item.size)
                      }
                    >
                      <MdClose className="text-2xl text-gray-500" />
                    </button>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="uppercase text-[15px]">{item.size}</span>
                    <span className="text-xs">|</span>
                    <span className="lowercase text-[15px]">{item.color}</span>
                  </div>

                  <span className="lowercase text-lg">
                    {formatCurrency(item.price * item.qty)}
                  </span>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    aria-label="Nhấn giảm số lượng đặt sản phẩm"
                    className={`flex w-9 h-8 justify-center items-center border-l border-t border-b border-black hover:bg-gray-100`}
                    onClick={() =>
                      debouncedChangeQtyProduct(item.slug, -1, item.size, 3)
                    }
                  >
                    <AiOutlineMinus className="text-xs" />
                  </button>
                  <input
                    aria-label="Ô hiển thị số lượng đặt sản phẩm"
                    className="w-9 h-8 text-center outline-none border border-black"
                    type="text"
                    value={item.qty}
                    readOnly
                  />
                  <button
                    type="button"
                    aria-label="Nhấn tăng số lượng đặt sản phẩm"
                    className={`flex w-9 h-8 justify-center items-center border-r border-t border-b border-black hover:bg-gray-100 ${
                      item.qty === 10
                        ? "opacity-30 pointer-events-none"
                        : "opacity-100 pointer-events-auto"
                    }`}
                    onClick={() =>
                      debouncedChangeQtyProduct(item.slug, 1, item.size, 3)
                    }
                  >
                    <AiOutlinePlus className="text-xs" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="z-10 h-[4.4rem] fixed bottom-0 left-0 flex justify-end md:justify-between w-full backdrop-blur-sm bg-white/60 border-t border-gray-300">
        <Link
          to="/products"
          aria-label="Đi đến trang tất cả sản phẩm"
          className="hidden md:flex items-center ml-5 gap-0.5 lowercase font-medium text-gray-700 hover:underline"
        >
          <MdArrowBackIos className="text-sm" />
          Tiếp thục mua
        </Link>

        <div className="flex justify-end w-full md:w-2/3">
          <div className="flex flex-col items-end justify-center mr-4 md:mr-6 lg:mr-8">
            <span className="lowercase text-[15px]">{quantity} sản phẩm.</span>
            <span className="lowercase text-[17px] font-medium">
              Tổng: {formatCurrency(total)}
            </span>
          </div>

          <Link
            to="/shipping"
            aria-label="Đi đến trang nhập địa chỉ đặt hàng"
            className="w-[42%] md:w-1/3 lg:w-1/4 flex items-center justify-center gap-0.5 lowercase text-white bg-black hover:underline"
          >
            Thanh toán
            <MdArrowForwardIos className="text-sm" />
          </Link>
        </div>
      </div>

      <SmallModal result={typeModal === "remove_item_cart"} type="" />
    </main>
  );
};

export default Contents;
