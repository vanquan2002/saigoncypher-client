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
      <div className="mx-5 md:mx-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Giỏ hàng của bạn.
      </h3>
      {cartItems.length === 0 ? (
        <h4 className="border-t border-gray-300 mt-5 md:mt-10 pt-5 md:pt-10 lowercase text-lg">
          <span className="ml-5 md:ml-0">Giỏ hàng của bạn đang trống!</span>
        </h4>
      ) : (
        <div className="grid grid-cols-5 md:gap-10 lg:gap-20 border-t border-gray-300 mt-5 md:mt-10 md:pt-5 lg:pt-20">
          <ul className="col-span-5 lg:col-span-3 flex flex-col">
            {cartItems.map((item, i) => (
              <li
                key={i}
                className={`flex items-center ${
                  cartItems.length > i && "border-b border-gray-300"
                } ${i !== 0 && "md:pt-5"} md:pb-5`}
              >
                <Link to={`/products/${item.product}/detail`}>
                  <img
                    className="w-28"
                    src={item.thumbImage}
                    alt={`Hình ảnh của ${item.name}`}
                    title={item.name}
                  />
                </Link>

                <div className="w-full flex flex-col items-star px-3">
                  <div className="w-full flex justify-between items-center">
                    <Link to={`/products/${item.product}/detail`}>
                      <h2 className="lowercase font-medium text-lg line-clamp-1">
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
                  <span className="lowercase text-[15px]">{item.color}.</span>
                  <span className="lowercase text-[15px]">{item.size}.</span>
                  <div className="w-full flex justify-between items-end mt-1">
                    <span className="lowercase text-lg">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                    <div className="flex items-center">
                      <button
                        type="button"
                        aria-label="Nhấn giảm số lượng đặt sản phẩm"
                        className={`flex w-9 h-8 justify-center items-center border-l border-t border-b border-black hover:bg-gray-100`}
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
                          dispatch(addToCart(item.product, 1, item.size))
                        }
                      >
                        <AiOutlinePlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="z-10 md:z-0 fixed bottom-0 left-0 w-full md:static md:col-span-5 lg:col-span-2 backdrop-blur-sm md:backdrop-blur-none bg-white/60 md:bg-transparent">
            <div className="sticky left-0 top-1/4 flex flex-col justify-between h-[7.7rem] md:h-32 lg:h-44 border-t md:border-t-0 lg:border-t lg:border-x border-gray-300">
              <div className="flex flex-col md:gap-1 px-5 pt-3 md:px-0 md:pt-0 lg:px-8 lg:pt-7">
                <span className="lowercase">
                  Tổng số lượng: {quantity} sản phẩm
                </span>
                <span className="lowercase text-xl font-medium">
                  Tổng tiền: {formatCurrency(total)}
                </span>
              </div>

              <div className="grid grid-cols-2 border-y border-x-0 md:border-x lg:border-x-0 border-gray-300">
                <Link
                  to="/products"
                  aria-label="Đi đến trang tất cả sản phẩm"
                  className="col-span-1 py-3 text-center lowercase text-gray-700"
                >
                  <span className="line-clamp-1">Tiếp tục mua sắm.</span>
                </Link>
                <Link
                  to="/shipping"
                  aria-label="Đi đến trang nhập địa chỉ giao hàng"
                  className="col-span-1 py-3 text-center lowercase bg-black text-white"
                >
                  Thanh toán.
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <SmallModal
        result={isSmallModal === "remove_item_cart"}
        text="Xóa khỏi giỏ hàng thành công!"
      />
    </main>
  );
};

export default Contents;
