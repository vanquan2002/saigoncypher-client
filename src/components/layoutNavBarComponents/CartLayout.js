import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/CartActions";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { AppContext } from "../../AppContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CART_ADD_ITEM_RESET } from "../../redux/constants/CartConstants";

const CartLayout = ({ result }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, indexAdded } = cart;
  const { toggleIsBarRight, isBarRight } = useContext(AppContext);
  const total = +cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const removeFromCartHandle = (id, size) => {
    dispatch(removeFromCart(id, size));
  };
  const checkOutHandle = () => {
    if (cartItems.length !== 0) {
      navigate("/login?redirect=shipping");
    } else {
      navigate("/cart");
    }
    toggleIsBarRight("");
  };
  const navigateProductDetailHandle = (product) => {
    navigate(`/products/${product}/detail`);
    toggleIsBarRight("");
  };
  const navigateCartHandle = () => {
    navigate("/cart");
    toggleIsBarRight("");
  };

  useEffect(() => {
    if (!isBarRight) {
      dispatch({
        type: CART_ADD_ITEM_RESET,
      });
    }
  }, [isBarRight]);

  return (
    <div
      className={`bg-white z-30 fixed top-0 right-0 duration-500 ${
        result ? "translate-x-0" : "translate-x-[100vw]"
      } `}
    >
      <div className="w-screen md:w-[500px] h-screen">
        <div className="sticky top-0 right-0 flex w-full justify-between items-center px-5 py-6">
          <p className="font-medium uppercase">Giỏ hàng</p>
          <MdClose
            onClick={() => toggleIsBarRight("")}
            className="cursor-pointer text-2xl md:text-3xl"
          />
        </div>

        <div className="overflow-auto h-full scrollbar-none">
          {cartItems.length === 0 ? (
            <div className="flex justify-center items-center my-14">
              <p className="text-opacity-45 text-sm md:text-base">
                Chưa có sản phẩm nào cả{"!"}
              </p>
            </div>
          ) : (
            <div className="mb-72">
              {cartItems.map((item, i) => (
                <div
                  className={` flex items-center gap-4 p-5 ${
                    cartItems.length - 1 > i && "border-b border-gray-300"
                  } ${
                    indexAdded &&
                    indexAdded.id === item.product &&
                    indexAdded.size === item.size &&
                    "bg-gray-50 animate-pulse"
                  }`}
                  key={i}
                >
                  <img
                    onClick={() => navigateProductDetailHandle(item.product)}
                    className="w-14 cursor-pointer"
                    src={item.thumbImage}
                    alt=""
                  />
                  <div className="flex w-full items-start justify-between gap-4">
                    <div className="flex w-full flex-col gap-[5px]">
                      <h6
                        onClick={() =>
                          navigateProductDetailHandle(item.product)
                        }
                        className="uppercase line-clamp-1 md:line-clamp-2 font-medium text-sm cursor-pointer"
                      >
                        {item.name}
                      </h6>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">
                          Size: <span className="uppercase">{item.size}</span>
                        </p>
                        <p className="text-sm">{item.color}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center bg-gray-100 h-7 w-7">
                          <p className="text-sm">{item.qty}</p>
                        </div>
                        <p className="text-sm">{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                    <div
                      className="p-1 rounded-full flex justify-center items-center border border-black"
                      onClick={() =>
                        removeFromCartHandle(item.product, item.size)
                      }
                    >
                      <MdClose size="1rem" className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white sticky bottom-0 left-0 w-full">
          <div className="flex items-center justify-between px-5">
            <p className="uppercase text-sm">Tổng tiền: </p>
            <p className="text-base font-medium ">{formatCurrency(total)}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateCartHandle()}
              className="duration-300 border-t border-r border-black w-full px-3 md:px-6 py-4 text-sm uppercase"
            >
              Xem giỏ hàng
            </button>
            <button
              className="duration-300 border-t border-black w-full px-3 md:px-6 py-4 text-sm uppercase"
              onClick={() => checkOutHandle()}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
