import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { MdChevronLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Giỏ hàng", url: "/cart" },
    { name: "Thông tin đặt hàng", url: "/shipping" },
    { name: "Thanh toán", url: "" },
  ];

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const quantity = cartItems.reduce((a, i) => a + i.qty, 0);

  // cart.itemsPrice = addDecimals(
  //   cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // );
  // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  // cart.totalPrice = addDecimals(
  //   Number(cart.itemsPrice) + Number(cart.shippingPrice)
  // );
  // useEffect(() => {
  //   if (success) {
  //     navigate(`/order/${order._id}`);
  //     dispatch({
  //       type: ORDER_CREATE_RESET,
  //     });
  //   }
  // }, [success, navigate, order, dispatch]);

  return (
    <main className="md:px-20">
      <div className="px-2 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Thanh toán.
      </h3>

      {cartItems.length === 0 ? (
        <h4 className="mt-5 md:mt-10 lowercase text-lg">
          <span className="ml-5 md:ml-0">
            Không có sản phẩm trong giỏ hàng để thanh toán!
          </span>
        </h4>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 md:mt-10 md:border-l border-t border-gray-300">
          <ul className="col-span-1">
            {cartItems.map((item, i) => (
              <li
                key={i}
                className={`flex ${
                  cartItems.length > i && "md:border-r border-b border-gray-300"
                }`}
              >
                <Link
                  to={`/products/${item.product}/detail`}
                  className="w-1/4 md:w-1/6"
                >
                  <img
                    className="w-full"
                    src={item.thumbImage}
                    alt={`Hình ảnh của ${item.name}`}
                    title={item.name}
                  />
                </Link>
                <div className="w-3/4 md:w-5/6 flex flex-col justify-between py-3 px-4 md:py-4 md:px-5">
                  <div>
                    <Link to={`/products/${item.product}/detail`}>
                      <h2 className="lowercase text-lg font-medium leading-6 line-clamp-2 md:line-clamp-1 hover:underline">
                        {item.name}.
                      </h2>
                    </Link>

                    <span className="lowercase text-[15px] mt-1">
                      {item.size} - {item.color}.
                    </span>
                  </div>
                  <span className="lowercase text-lg">
                    {formatCurrency(item.price * item.qty)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="col-span-1"></div>
        </div>
      )}

      <div className="z-10 h-[4.5rem] md:h-28 lg:h-20 fixed bottom-0 left-0 grid grid-cols-5 md:grid-cols-4 lg:grid-cols-7 w-full backdrop-blur-sm bg-white/60 border-t border-gray-300">
        <div className="hidden md:col-span-1 md:flex items-center ml-5">
          <Link
            to="/shipping"
            aria-label="Đi đến trang tất cả sản phẩm"
            className="lowercase font-medium text-gray-700 hover:underline flex items-center"
          >
            <MdChevronLeft className="text-2xl mr-[-2px]" />
            Thông tin đặt hàng.
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
            Đặt hàng.
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Contents;
