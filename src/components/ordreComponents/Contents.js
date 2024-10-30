import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Breadcrumbs from "./../Breadcrumbs";
import { detailsOrder } from "../../redux/actions/OrderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/OrderConstants";
import { formatCurrency } from "../../utils/formatCurrency";
import { AppContext } from "../../AppContext";
import SmallModal from "./../modals/SmallModal";
import Error from "../loadingError/Error";
import "moment/locale/vi";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Thông tin cá nhân", url: "/profile" },
    { name: "Chi tiết đơn hàng", url: "" },
  ];
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success } = orderCreate;
  const dispatch = useDispatch();
  const totalQuantity = order?.orderItems.reduce((a, i) => a + i.qty, 0);
  const { isSmallModal, toggleIsSmallModal } = useContext(AppContext);

  useEffect(() => {
    dispatch(detailsOrder(id));
  }, [id]);

  useEffect(() => {
    if (success) {
      dispatch({
        type: ORDER_CREATE_RESET,
      });
      toggleIsSmallModal("create_order");
    }
  }, [success]);

  // {moment(order.orderStatus.preparedAt)
  //   .add(1, "days")
  //   .format("DD/MM/YYYY")}

  return (
    <main className="md:px-20">
      <div className="px-5 md:px-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Chi tiết đơn hàng.
      </h3>

      {loading ? (
        <span>Loading</span>
      ) : error ? (
        <div className="mx-5 md:mx-0 mt-5 md:mt-10">
          <Error error={error} />
        </div>
      ) : (
        <div className="mt-5 md:mt-10">
          <div className="border border-gray-300 px-4 py-3">
            <h4 className="lowercase font-medium">Trạng thái đơn hàng.</h4>
            <ul className="flex flex-wrap gap-x-3 mt-1">
              <li className="flex items-center gap-1">
                <span className="lowercase text-[15px]">Đang chuẩn bị</span>
                <span className="lowercase text-sm text-gray-700">
                  ({moment(order.orderStatus.preparedAt).calendar()})
                </span>
              </li>

              <li className="flex items-center">
                <div className="w-7 border-t border-gray-300"></div>
              </li>

              <li
                className={`flex items-center gap-1 ${
                  order.orderStatus.isDelivered ? "opacity-100" : "opacity-30"
                }`}
              >
                <span className="lowercase text-[15px]">Đang giao</span>
                {order.orderStatus.deliveredAt && (
                  <span className="lowercase text-sm text-gray-700">
                    ({moment(order.orderStatus.deliveredAt).calendar()})
                  </span>
                )}
              </li>

              <li className="flex items-center">
                <div className="w-7 border-t border-gray-300"></div>
              </li>

              <li
                className={`flex items-center gap-1 ${
                  order.orderStatus.isReceived ? "opacity-100" : "opacity-30"
                }`}
              >
                <span className="lowercase text-[15px]">Đã giao</span>
                {order.orderStatus.receivedAt && (
                  <span className="lowercase text-sm text-gray-700">
                    ({moment(order.orderStatus.receivedAt).calendar()})
                  </span>
                )}
              </li>
            </ul>
          </div>

          <div className="flex flex-col lg:flex-row gap-x-20 gap-y-10 mt-10">
            <section className="w-full">
              <span className="px-5 md:px-0 lowercase font-medium">
                Sản phẩm({totalQuantity})
              </span>
              <ul className="flex flex-col md:gap-5 mt-2">
                {order.orderItems.map((item, i) => (
                  <li
                    key={i}
                    className={`flex border-x ${
                      i !== 0 ? "border-b md:border-y" : "border-y"
                    } border-gray-300`}
                  >
                    <Link
                      to={`/products/${item.product}/detail`}
                      className="w-1/3 md:w-1/5"
                    >
                      <img
                        className="w-full"
                        src={item.thumbImage}
                        alt={`Hình ảnh của ${item.name}`}
                        title={item.name}
                      />
                    </Link>
                    <div className="w-2/3 md:w-4/5 flex flex-col justify-between p-3 md:p-4">
                      <div>
                        <Link to={`/products/${item.product}/detail`}>
                          <h2 className="lowercase text-lg leading-6 line-clamp-2 md:line-clamp-1 hover:underline">
                            {item.name}.
                          </h2>
                        </Link>

                        <span className="lowercase text-[15px] mt-1">
                          {item.size} - {item.color}.
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="lowercase text-[15px]">
                          {formatCurrency(item.price)} x {item.qty}
                        </span>
                        <span className="lowercase text-lg">
                          {formatCurrency(item.price * item.qty)}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label="Mở ô đánh giá sản phẩm"
                        className={`w-full px-4 py-2  text-sm hover:underline ${
                          order.orderStatus.isReceived
                            ? "bg-black text-white"
                            : "text-black border border-black pointer-events-none opacity-30"
                        }`}
                      >
                        Đánh giá.
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="px-5 md:px-0 w-full">
              <ul className="flex flex-col gap-6">
                <li>
                  <h4 className="lowercase font-medium">Địa chỉ nhận hàng.</h4>
                  <span className="text-[15px] mr-1">
                    {order.deliveryInformation.fullName} (
                    {order.deliveryInformation.phone}),
                  </span>
                  <span className="text-[15px] mr-1">
                    {order.deliveryInformation.address},
                  </span>
                  <span className="text-[15px] mr-1">
                    {order.deliveryInformation.ward},
                  </span>
                  <span className="text-[15px] mr-1">
                    {order.deliveryInformation.district},
                  </span>
                  <span className="text-[15px]">
                    {order.deliveryInformation.province}.
                  </span>
                </li>

                <li>
                  <span className="lowercase font-medium">
                    Phương thức vận chuyển.
                  </span>
                  <div className="flex justify-between mt-1">
                    <span className="lowercase text-[15px]">
                      Giao hàng tận nơi.
                    </span>
                    <span className="lowercase text-[15px]">
                      {formatCurrency(order.shippingPrice)}
                    </span>
                  </div>
                </li>

                <li className="flex flex-col">
                  <span className="lowercase font-medium">
                    Phương thức thanh toán.
                  </span>
                  <span className="lowercase text-[15px] mt-1">
                    Thanh toán khi nhận hàng{" "}
                    <span className="uppercase">(COD)</span>.
                  </span>
                </li>

                {order.note && (
                  <li>
                    <span className="lowercase font-medium">Lời nhắn.</span>
                    <textarea
                      aria-label="Nhập lời nhắn của bạn"
                      value={order.note}
                      placeholder="Nhập lời nhắn"
                      className="px-4 py-2 bg-gray-100 italic resize-none w-full text-sm outline-none placeholder:lowercase scrollbar-thin"
                      maxLength={200}
                      cols="30"
                      rows="3"
                      readOnly
                    ></textarea>
                  </li>
                )}

                <li className="flex flex-col gap-1">
                  <span className="lowercase font-medium">
                    Chi tiết thanh toán.
                  </span>
                  <div className="flex justify-between">
                    <span className="lowercase text-[15px]">Giá sản phẩm</span>
                    <span className="lowercase text-[15px]">
                      {formatCurrency(order.itemsPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="lowercase text-[15px]">
                      Phí vận chuyển
                    </span>
                    <span className="lowercase text-[15px]">
                      {formatCurrency(order.shippingPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 mt-1 border-t border-gray-300">
                    <span className="lowercase text-[15px]">Tổng cộng</span>
                    <span className="lowercase text-[15px]">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </li>
              </ul>

              <button
                type="button"
                aria-label="Hủy đơn đặt hàng"
                className={`mt-8 w-full px-4 py-2 text-sm hover:underline border border-black ${
                  order.orderStatus.isDelivered &&
                  "opacity-30 pointer-events-none"
                }`}
              >
                Hủy đơn hàng.
              </button>
              <p className="mt-2 lowercase text-[13px]">
                Lưu ý: Nếu đơn hàng đang được giao thì không thể hủy!
              </p>
            </section>
          </div>
        </div>
      )}
      <SmallModal
        result={isSmallModal === "create_order"}
        text="Đặt hàng thành công!"
      />
    </main>
  );
};

export default Contents;
