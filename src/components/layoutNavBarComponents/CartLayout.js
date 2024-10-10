import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/CartActions";
import { Link, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { AppContext } from "../../AppContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CART_ADD_ITEM_RESET } from "../../redux/constants/CartConstants";

const CartLayout = ({ result }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, indexAdded } = cart;
  const { toggleIsBarRight, isBarRight } = useContext(AppContext);
  const total = +cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const location = useLocation();

  const removeFromCartHandle = (id, size) => {
    dispatch(removeFromCart(id, size));
  };

  useEffect(() => {
    if (isBarRight === "cart") {
      toggleIsBarRight("");
    }
  }, [location]);

  useEffect(() => {
    if (!isBarRight && indexAdded && Object.keys(indexAdded).length > 0) {
      dispatch({
        type: CART_ADD_ITEM_RESET,
      });
    }
  }, [isBarRight]);

  return (
    <div
      className={`bg-white z-30 fixed top-0 right-0 duration-500 w-screen md:w-[500px] h-screen ${
        result ? "translate-x-0" : "translate-x-[100vw]"
      } `}
    >
      <div className="sticky top-0 right-0 flex w-full justify-between items-center px-5 py-6">
        <span className="font-medium uppercase">Giỏ hàng</span>
        <button aria-label="Đóng giỏ hàng" onClick={() => toggleIsBarRight("")}>
          <MdClose className="text-2xl md:text-3xl" />
        </button>
      </div>

      <section className="flex justify-center items-start overflow-auto h-full scrollbar-none ">
        {cartItems.length === 0 ? (
          <span className="text-gray-500 mt-40">Chưa có sản phẩm nào cả!</span>
        ) : (
          <div className="mb-72 w-full">
            {cartItems.map((item, i) => (
              <div
                className={`flex items-center gap-4 p-5 ${
                  cartItems.length - 1 > i && "border-b border-gray-300"
                } ${
                  indexAdded &&
                  indexAdded.id === item.product &&
                  indexAdded.size === item.size &&
                  "bg-gray-50 animate-pulse"
                }`}
                key={i}
              >
                <Link to={`/products/${item.product}/detail`}>
                  <img
                    className="w-14"
                    src={item.thumbImage}
                    alt={`Hình ảnh của ${item.name}`}
                    title={item.name}
                  />
                </Link>
                <div className="w-full flex items-start justify-between gap-4">
                  <div className="w-full flex flex-col items-start gap-1">
                    <Link to={`/products/${item.product}/detail`}>
                      <h2 className="uppercase line-clamp-1 text-sm">
                        {item.name}
                      </h2>
                    </Link>
                    <div className="w-full flex justify-between">
                      <span className="text-sm">
                        Size: <span className="uppercase">{item.size}</span>
                      </span>
                      <span className="text-sm">{item.color}</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex justify-center items-center bg-gray-100 h-7 w-7">
                        <p className="text-sm">{item.qty}</p>
                      </div>
                      <span className="text-sm">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                  <button
                    aria-label="Xóa sản phẩm khỏi giỏ hàng của bạn"
                    onClick={() =>
                      removeFromCartHandle(item.product, item.size)
                    }
                  >
                    <MdClose className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="bg-white sticky bottom-0 left-0 w-full">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="uppercase text-sm">Tổng tiền: </span>
          <span className="text-base font-medium ">
            {formatCurrency(total)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Link
            aria-label="Đi đến trang giỏ hàng"
            to="/cart"
            className="text-center border-t border-r border-black w-full px-3 md:px-6 py-4 text-sm uppercase"
          >
            Xem giỏ hàng
          </Link>
          <Link
            aria-label="Đi đến trang thanh toán"
            to={`${cartItems.length > 0 ? "/shipping" : "/cart"}`}
            className="text-center border-t border-black w-full px-3 md:px-6 py-4 text-sm uppercase"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
