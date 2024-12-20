import React, { useContext, useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import MessageModal from "../modals/MessageModal";
import { AppContext } from "../../AppContext";
import { createOrder } from "./../../redux/actions/OrderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/OrderConstants";
import debounce from "lodash.debounce";
import { MdArrowBackIos } from "react-icons/md";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Giỏ hàng", url: "/cart" },
    { name: "Thông tin đặt hàng", url: "/shipping" },
    { name: "Thanh toán", url: "" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;
  const itemsPrice = cartItems
    .reduce((a, i) => a + i.qty * i.price, 0)
    .toFixed(0);
  const totalQuantity = cartItems.reduce((a, i) => a + i.qty, 0);
  const shippingPrice = 30000;
  const totalPrice = Number(itemsPrice) + Number(shippingPrice);
  const { toggleIsMassage } = useContext(AppContext);
  const [note, setNote] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [payment, setPayment] = useState("cod");
  const hasDeliveryInformation =
    userInfo.deliveryInformation &&
    Object.values(userInfo.deliveryInformation).every((value) => value);
  const payments = [
    {
      value: "cod",
      ariaLabel: "Chọn nếu bạn muốn thanh toán khi nhận hàng",
      contents: "Thanh toán khi nhận hàng (COD)",
      active: true,
    },
    {
      value: "bank",
      ariaLabel: "Chọn nếu bạn muốn thanh toán qua thẻ ngân hàng",
      contents: "Thanh toán qua thẻ ngân hàng",
      active: false,
    },
    {
      value: "momo",
      ariaLabel:
        "Chọn nếu bạn muốn thanh toán qua cổng thanh toán trực tuyến Momo",
      contents: "Thanh toán qua cổng thanh toán trực tuyến (Momo)",
      active: false,
    },
  ];
  const debouncedCreateOrder = useMemo(
    () =>
      debounce(() => {
        if (!hasDeliveryInformation) {
          toggleIsMassage("Bạn chưa nhập thông tin đặt hàng!");
          setTypeMessage("shipping");
        } else {
          if (cartItems.length === 0) {
            toggleIsMassage("Không có sản phẩm nào để đặt!");
            setTypeMessage("");
          } else {
            dispatch(
              createOrder({
                orderItems: cartItems,
                deliveryInformation: userInfo.deliveryInformation,
                itemsPrice,
                shippingPrice,
                totalPrice,
                note,
              })
            );
          }
        }
      }, 200),
    [note]
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!hasDeliveryInformation) {
      toggleIsMassage("Bạn chưa nhập thông tin đặt hàng!");
      setTypeMessage("shipping");
    }
  }, []);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toggleIsMassage(error);
      setTypeMessage("");
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
  }, [error]);

  return (
    <main>
      <div className="px-5 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="mx-0 md:mx-5 border-t border-neutral-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Thanh toán.
      </h3>

      <div className="px-0 md:px-5 mt-5 md:mt-10">
        <div className="bg-neutral-100 border border-neutral-300 px-4 py-2">
          <div className="flex justify-between ">
            <h4 className="lowercase font-medium">Địa chỉ nhận hàng.</h4>
            <Link
              aria-label="Đi đến trang nhập thông tin đặt hàng"
              to="/shipping"
              className="lowercase text-[15px] ml-2"
            >
              Sửa
            </Link>
          </div>
          {hasDeliveryInformation ? (
            <>
              <span className="text-[15px] mr-1">
                {userInfo.deliveryInformation.fullName} (
                {userInfo.deliveryInformation.phone}),
              </span>
              <span className="text-[15px] mr-1">
                {userInfo.deliveryInformation.address},
              </span>
              <span className="text-[15px] mr-1">
                {userInfo.deliveryInformation.ward},
              </span>
              <span className="text-[15px] mr-1">
                {userInfo.deliveryInformation.district},
              </span>
              <span className="text-[15px]">
                {userInfo.deliveryInformation.province}
              </span>
            </>
          ) : (
            <span className="lowercase text-[15px]">Chưa cập nhật!</span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-x-20 gap-y-6 mt-6 md:mt-10">
          <section className="w-full">
            <span className="px-5 md:px-0 lowercase font-medium">
              Sản phẩm({totalQuantity})
            </span>
            <ul className="mt-2 border-l border-t border-neutral-300">
              {cartItems.map((item, i) => (
                <li
                  key={i}
                  className={`flex ${
                    cartItems.length > i &&
                    "border-r border-b border-neutral-300"
                  }`}
                >
                  <Link to={`/product/${item.slug}`} className="w-1/4 md:w-1/6">
                    <img
                      className="w-full"
                      src={item.thumbImage}
                      alt={`Hình ảnh của ${item.name}`}
                      title={item.name}
                    />
                  </Link>
                  <div className="w-3/4 md:w-5/6 flex flex-col justify-between py-3 px-4 md:py-4 md:px-5">
                    <div>
                      <Link to={`/product/${item.slug}`}>
                        <h2 className="lowercase text-lg font-medium leading-6 line-clamp-2 md:line-clamp-1 hover:underline">
                          {item.name}
                        </h2>
                      </Link>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="uppercase text-[13px]">
                          {item.size}
                        </span>
                        <span className="text-xs">|</span>
                        <span className="lowercase text-[13px]">
                          {item.color}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="lowercase text-[13px]">
                        {formatCurrency(item.price)} x {item.qty}
                      </span>
                      <span className="lowercase text-[17px]">
                        {formatCurrency(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="px-5 md:px-0 w-full">
            <ul className="flex flex-col gap-6">
              <li>
                <span className="lowercase font-medium">
                  Phương thức vận chuyển
                </span>
                <div className="flex justify-between mt-2 px-4 py-2 border border-neutral-300">
                  <span className="text-[15px]">Giao hàng tận nơi.</span>
                  <span className="text-[15px]">
                    {formatCurrency(shippingPrice)}
                  </span>
                </div>
              </li>

              <li className="flex flex-col">
                <fieldset>
                  <legend className="lowercase font-medium">
                    Phương thức thanh toán
                  </legend>
                  <div className="mt-2 border border-neutral-300">
                    {payments.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center ${
                          payment === item.value ? "bg-neutral-100" : "bg-white"
                        } duration-300`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          id={item.value}
                          value={item.value}
                          aria-label={item.ariaLabel}
                          onChange={(e) =>
                            item.active && setPayment(e.target.value)
                          }
                          hidden
                        />
                        <label
                          htmlFor={item.value}
                          className={`w-full flex items-center gap-3 text-[15px] px-3 py-2 ${
                            !item.active ? "opacity-30" : "cursor-pointer"
                          }`}
                        >
                          <div
                            className={`h-3 min-w-3 rounded-full ${
                              payment === item.value
                                ? "bg-green-600"
                                : "bg-neutral-300"
                            } duration-300`}
                          ></div>
                          <p>
                            {item.contents}
                            {!item.active && (
                              <span className="ml-1 lowercase text-[13px] font-light italic">
                                * Chưa khả dụng
                              </span>
                            )}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </li>

              <li className="relative">
                <span className="lowercase font-medium">Lời nhắn.</span>
                <textarea
                  aria-label="Nhập lời nhắn của bạn"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập lời nhắn"
                  className="mt-2 resize-none w-full px-3 py-2 border border-neutral-300 bg-transparent text-sm outline-none placeholder:lowercase scrollbar-thin"
                  maxLength={200}
                  cols="30"
                  rows="3"
                ></textarea>
                <p className="text-xs text-neutral-500 text-right">
                  {note.length}/200 ký tự
                </p>
              </li>

              <li className="flex flex-col gap-1">
                <span className="lowercase font-medium">
                  Chi tiết thanh toán.
                </span>
                <div className="flex justify-between">
                  <span className="lowercase text-[15px]">Giá sản phẩm</span>
                  <span className="lowercase text-[15px]">
                    {formatCurrency(itemsPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="lowercase text-[15px]">Phí vận chuyển</span>
                  <span className="lowercase text-[15px]">
                    {formatCurrency(shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 mt-1 border-t border-neutral-300">
                  <span className="lowercase text-[15px]">Tổng cộng</span>
                  <span className="lowercase text-[15px]">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className="z-10 h-[4.4rem] fixed bottom-0 left-0 flex justify-end md:justify-between w-full backdrop-blur-sm bg-white/60 border-t border-neutral-300">
        <Link
          to="/shipping"
          aria-label="Đi đến trang nhập thông tin đặt hàng"
          className="hidden md:flex items-center ml-5 gap-0.5 lowercase font-medium text-neutral-700 hover:underline"
        >
          <MdArrowBackIos className="text-sm" />
          Thông tin đặt hàng
        </Link>

        <div className="flex justify-end w-full md:w-2/3">
          <div className="flex flex-col items-end justify-center mr-4 md:mr-6 lg:mr-8">
            <span className="lowercase text-[15px]">
              {totalQuantity} sản phẩm.
            </span>
            <span className="lowercase text-[17px] font-medium">
              Tổng: {formatCurrency(totalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => debouncedCreateOrder()}
            aria-label="Cập nhật thông tin đặt hàng và đi đến trang thanh toán"
            className="w-[42%] md:w-1/3 lg:w-1/4 flex items-center justify-center lowercase text-white bg-black hover:opacity-80"
          >
            {loading ? "Đang đặt hàng..." : "Đặt hàng."}
          </button>
        </div>
      </div>

      <MessageModal type={typeMessage} />
    </main>
  );
};

export default Contents;
