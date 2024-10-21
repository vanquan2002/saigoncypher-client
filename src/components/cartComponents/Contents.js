import React, { useContext, useEffect } from "react";
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

  const removeFromCartHandle = (id, size) => {
    toggleIsSmallModal("");
    dispatch(removeFromCart(id, size));
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (successType === 2) {
      dispatch({
        type: CART_ADD_ITEM_RESET,
      });
      toggleIsSmallModal("remove_item_cart");
    }
  }, [successType]);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-40 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Giỏ hàng của bạn.
      </h3>
      {cartItems.length === 0 ? (
        <h4 className="mt-5 md:mt-10 mx-5 lowercase text-lg px-6 py-4 border border-black">
          Giỏ hàng của bạn đang trống!
        </h4>
      ) : (
        <div className="mt-5 md:mt-10 grid grid-cols-2 gap-20">
          <ul className="col-span-1 flex flex-col border-y py-5 border-gray-300">
            {cartItems.map((item, i) => (
              <li
                key={i}
                className={`flex items-center gap-5 ${
                  cartItems.length - 1 > i &&
                  "border-b pb-5 mb-5 border-gray-300"
                } `}
              >
                <Link to={`/products/${item.product}/detail`}>
                  <img
                    className="w-20"
                    src={item.thumbImage}
                    alt={`Hình ảnh của ${item.name}`}
                    title={item.name}
                  />
                </Link>

                <div className="w-full flex items-start gap-2">
                  <div className="w-full flex flex-col items-start gap-1">
                    <Link to={`/products/${item.product}/detail`}>
                      <h2 className="lowercase font-medium text-lg line-clamp-1">
                        {item.name}.
                      </h2>
                    </Link>
                    <div className="flex items-center gap-5">
                      <span className="lowercase text-[15px]">
                        {item.size}.
                      </span>
                      <span className="lowercase text-[15px]">
                        {item.color}.
                      </span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span className="lowercase text-[15px]">
                        {formatCurrency(item.price * item.qty)}
                      </span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          aria-label="Nhấn giảm số lượng đặt sản phẩm"
                          className={`flex w-8 h-7 justify-center items-center border-l border-t border-b border-black hover:bg-gray-100`}
                          onClick={() =>
                            item.qty === 1
                              ? removeFromCartHandle(item.product, item.size)
                              : dispatch(addToCart(item.product, -1, item.size))
                          }
                        >
                          <AiOutlineMinus className="text-xs" />
                        </button>
                        <input
                          aria-label="Ô hiển thị số lượng đặt sản phẩm"
                          className="w-8 h-7 text-center outline-none border border-black"
                          type="text"
                          value={item.qty}
                          readOnly
                        />
                        <button
                          type="button"
                          aria-label="Nhấn tăng số lượng đặt sản phẩm"
                          className={`flex w-8 h-7 justify-center items-center border-r border-t border-b border-black hover:bg-gray-100 ${
                            item.qty === 10
                              ? "opacity-30 pointer-events-none"
                              : "opacity-100 pointer-events-auto"
                          }`}
                          onClick={() =>
                            dispatch(addToCart(item.product, 1, item.size))
                          }
                        >
                          <AiOutlinePlus className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Xóa sản phẩm ${item.name} - ${item.size} khỏi giỏ hàng`}
                    onClick={() =>
                      removeFromCartHandle(item.product, item.size)
                    }
                  >
                    <MdClose className="text-xl text-gray-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="col-span-1">
            <span>Tổng đơn hàng: {quantity} sản phẩm</span>
          </div>
        </div>
      )}

      <div className="z-20 border-t border-gray-500 fixed bottom-0 left-0 h-16 flex gap-8 items-center justify-between w-full backdrop-blur-sm bg-white/30">
        <Link
          to="/products"
          aria-label="Đi đến trang tất cả sản phẩm"
          className="ml-5 lowercase font-medium text-gray-700"
        >
          Tiếp tục mua sắm.
        </Link>
        <div className="flex items-center h-full">
          <span className="lowercase font-medium mr-5 text-gray-700">
            Tổng: {formatCurrency(total)}
          </span>
          <Link
            to="/shipping"
            aria-label="Đi đến trang nhập địa chỉ giao hàng"
            className="lowercase bg-black h-full px-8 text-white flex items-center"
          >
            Thanh toán.
          </Link>
        </div>
      </div>

      <SmallModal
        result={isSmallModal === "remove_item_cart"}
        text="Xóa khỏi giỏ hàng thành công!"
      />
    </main>
  );
};

export default Contents;
