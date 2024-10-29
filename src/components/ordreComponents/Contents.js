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
import { PiDotOutlineFill } from "react-icons/pi";
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
          <div className="bg-gray-100 px-4 py-2">
            <h4 className="lowercase font-medium">Trạng thái đơn hàng.</h4>
            <ul className="flex gap-1">
              <li className="lowercase flex items-center text-[15px]">
                <div className="flex flex-col items-center">
                  <span>Đang chuẩn bị</span>
                  <p>({moment(order.orderStatus.preparedAt).calendar()})</p>
                </div>
                <PiDotOutlineFill className="text-gray-500 ml-1 text-lg" />
              </li>
              <li className="lowercase flex items-center text-[15px]">
                <div className="flex flex-col items-center">
                  <span> Đang giao</span>
                  <p>
                    (<span className="mr-1">Dự kiến</span>
                    {moment(order.orderStatus.preparedAt)
                      .add(1, "days")
                      .format("DD/MM/YYYY")}
                    )
                  </p>
                </div>
                <PiDotOutlineFill className="text-gray-500 ml-1 text-lg" />
              </li>

              <li className="lowercase flex items-center text-[15px]">
                <span>Đã giao</span>
                <PiDotOutlineFill className="text-gray-500 ml-1 text-lg" />
              </li>
              <li className="lowercase flex items-center text-[15px]">
                <span>Trả hàng</span>
                <PiDotOutlineFill className="text-gray-500 ml-1 text-lg" />
              </li>
              <li className="lowercase flex items-center text-[15px]">
                <span>Đã hủy</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col lg:flex-row gap-x-20 gap-y-10 mt-7">
            <section className="w-full">
              <span className="px-5 md:px-0 lowercase font-medium">
                Sản phẩm({totalQuantity})
              </span>
              <ul className="mt-2 border-l border-t border-gray-300">
                {order.orderItems.map((item, i) => (
                  <li
                    key={i}
                    className={`flex ${
                      order.orderItems.length > i &&
                      "border-r border-b border-gray-300"
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
                      <div className="flex justify-between items-end">
                        <span className="lowercase text-[15px]">
                          {formatCurrency(item.price)} x {item.qty}
                        </span>
                        <span className="lowercase text-lg">
                          {formatCurrency(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-6 px-5 md:px-0 w-full">
              <div>
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
              </div>

              <div>
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
              </div>

              <div className="flex flex-col">
                <span className="lowercase font-medium">
                  Phương thức thanh toán.
                </span>
                <span className="lowercase text-[15px] mt-1">
                  Thanh toán khi nhận hàng{" "}
                  <span className="uppercase">(COD)</span>.
                </span>
              </div>

              {order.note && (
                <div>
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
                </div>
              )}

              <div className="flex flex-col gap-1">
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
                  <span className="lowercase text-[15px]">Phí vận chuyển</span>
                  <span className="lowercase text-[15px]">
                    {formatCurrency(order.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-300">
                  <span className="lowercase text-[15px]">Tổng cộng</span>
                  <span className="lowercase text-[15px]">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>
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
