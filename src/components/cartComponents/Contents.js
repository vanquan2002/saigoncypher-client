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
    dispatch(removeFromCart(id, size, 2));
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
                to={`/products/${item.product}/detail`}
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
                    <Link to={`/products/${item.product}/detail`}>
                      <h2 className="lowercase text-lg font-medium leading-6 line-clamp-2 hover:underline">
                        {item.name}.
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

                  <span className="lowercase text-[15px] mt-1 md:mt-2">
                    {item.size} - {item.color}.
                  </span>

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
                      item.qty === 1
                        ? removeFromCartHandle(item.product, item.size)
                        : dispatch(addToCart(item.product, -1, item.size, 3))
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
                      dispatch(addToCart(item.product, 1, item.size, 3))
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

      <div className="z-10 h-[4.5rem] md:h-28 lg:h-20 fixed bottom-0 left-0 grid grid-cols-5 md:grid-cols-4 lg:grid-cols-7 w-full backdrop-blur-sm bg-white/60 border-t border-gray-300">
        <div className="hidden md:col-span-1 md:flex items-center ml-5">
          <Link
            to="/products"
            aria-label="Đi đến trang tất cả sản phẩm"
            className="lowercase font-medium text-gray-700 hover:underline"
          >
            Tiếp tục mua sắm.
          </Link>
        </div>

        <div className="col-span-3 md:col-span-2 lg:col-span-5 flex flex-col items-end justify-center mr-4 md:mr-6 lg:mr-10">
          <span className="lowercase text-[15px]">{quantity} sản phẩm.</span>
          <span className="lowercase text-lg font-semibold">
            Tổng: {formatCurrency(total)}
          </span>
        </div>

        <div className="col-span-2 md:col-span-1 flex justify-end">
          <Link
            to="/shipping"
            aria-label="Đi đến trang nhập địa chỉ giao hàng"
            className="flex items-center justify-center w-full h-full lowercase bg-black text-white text-lg hover:underline"
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
