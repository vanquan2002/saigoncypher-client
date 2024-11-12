import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Breadcrumbs from "./../Breadcrumbs";
import { cancelOrder, detailsOrder } from "../../redux/actions/OrderActions";
import {
  ORDER_CREATE_RESET,
  ORDER_UPDATE_CANCEL_RESET,
} from "../../redux/constants/OrderConstants";
import { formatCurrency } from "../../utils/formatCurrency";
import { AppContext } from "../../AppContext";
import SmallModal from "./../modals/SmallModal";
import Error from "../loadingError/Error";
import "moment/locale/vi";
import MessageModal from "../modals/MessageModal";
import OrderDetailSkeleton from "../skeletons/OrderDetailSkeleton";
import debounce from "lodash.debounce";
import ReviewModal from "./../modals/ReviewModal";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/ProductConstants";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Thông tin cá nhân", url: "/profile" },
    { name: "Chi tiết đơn hàng", url: "" },
  ];
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    loading: loadingDetailsOrder,
    order,
    error: errorDetailsOrder,
  } = orderDetails;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success: successCreateOrder } = orderCreate;
  const orderUpdateCancel = useSelector((state) => state.orderUpdateCancel);
  const {
    loading: loadingCancelOrder,
    success: successCancelOrder,
    error: errorCancelOrder,
  } = orderUpdateCancel;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successCreateReview } = productCreateReview;
  const dispatch = useDispatch();
  const totalQuantity = order?.orderItems.reduce((a, i) => a + i.qty, 0);
  const { isSmallModal, toggleIsSmallModal, toggleIsMassage } =
    useContext(AppContext);
  const [typeModal, setTypeModal] = useState("");
  const { toggleIsReviewModal } = useContext(AppContext);
  const [numberOpenReviewModal, setNumberOpenReviewModal] = useState(null);

  const openReviewModalHandle = (num) => {
    setNumberOpenReviewModal(num);
    toggleIsReviewModal(true);
  };

  const debouncedCancelOrder = useMemo(
    () =>
      debounce(() => {
        dispatch(cancelOrder(id));
      }, 200),
    []
  );

  const cancelOrderHandle = () => {
    if (isSmallModal) {
      toggleIsSmallModal("");
    }
    if (typeModal) {
      setTypeModal("");
    }
    debouncedCancelOrder();
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(detailsOrder(id));
  }, [id]);

  useEffect(() => {
    if (successCancelOrder) {
      dispatch(detailsOrder(id));
      toggleIsSmallModal("Hủy đơn hàng thành công!");
      setTypeModal("cancel_order");
      dispatch({ type: ORDER_UPDATE_CANCEL_RESET });
    }
  }, [successCancelOrder]);

  useEffect(() => {
    if (successCreateOrder) {
      toggleIsSmallModal("Đặt hàng thành công!");
      setTypeModal("create_order");
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [successCreateOrder]);

  useEffect(() => {
    if (successCreateReview) {
      dispatch(detailsOrder(id));
      toggleIsSmallModal("Đánh giá thành công!");
      setTypeModal("review_success");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [successCreateReview]);

  useEffect(() => {
    if (errorCancelOrder) {
      toggleIsMassage(errorCancelOrder);
      if (
        errorCancelOrder === "Đơn hàng đang được vận chuyển, không thể hủy!"
      ) {
        dispatch(detailsOrder(id));
      }
      dispatch({
        type: ORDER_UPDATE_CANCEL_RESET,
      });
    }
  }, [errorCancelOrder]);

  return (
    <main className="md:px-20">
      <div className="px-5 md:px-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Chi tiết đơn hàng.
      </h3>

      {loadingDetailsOrder ? (
        <OrderDetailSkeleton />
      ) : errorDetailsOrder ? (
        <div className="mx-5 md:mx-0 mt-5 md:mt-10">
          <Error error={errorDetailsOrder} />
        </div>
      ) : (
        <div className="mt-5 md:mt-10">
          <div className="bg-gray-50 border border-gray-300 px-4 py-3">
            <h4 className="lowercase font-medium">Trạng thái đơn hàng.</h4>
            <ul className="flex flex-wrap gap-x-3 mt-1">
              <li className="flex items-center gap-1">
                <span className="lowercase text-[15px]">Đang chuẩn bị</span>
                <span className="lowercase text-[15px] text-gray-800">
                  ({moment(order.orderStatus.preparedAt).calendar()})
                </span>
              </li>

              <li className="flex items-center">
                <div className="w-7 border-t border-gray-300"></div>
              </li>

              {order.orderStatus.isCancelled ? (
                <li className="flex items-center gap-1">
                  <span className="lowercase text-[15px]">Đã hủy</span>
                  <span className="lowercase text-[15px] text-gray-800">
                    ({moment(order.orderStatus.cancelledAt).calendar()})
                  </span>
                </li>
              ) : (
                <>
                  <li
                    className={`flex items-center gap-1 ${
                      order.orderStatus.isDelivered
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  >
                    <span className="lowercase text-[15px]">Đang giao</span>
                    {order.orderStatus.deliveredAt && (
                      <span className="lowercase text-[15px] text-gray-800">
                        ({moment(order.orderStatus.deliveredAt).calendar()})
                      </span>
                    )}
                  </li>

                  <li className="flex items-center">
                    <div className="w-7 border-t border-gray-300"></div>
                  </li>

                  <li
                    className={`flex items-center gap-1 ${
                      order.orderStatus.isReceived
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  >
                    <span className="lowercase text-[15px]">Đã giao</span>
                    {order.orderStatus.receivedAt && (
                      <span className="lowercase text-[15px] text-gray-800">
                        ({moment(order.orderStatus.receivedAt).calendar()})
                      </span>
                    )}
                  </li>

                  <li className="flex items-center">
                    <div className="w-7 border-t border-gray-300"></div>
                  </li>

                  <li
                    className={`flex items-center gap-1 ${
                      order.orderStatus.isPaid ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <span className="lowercase text-[15px]">Đã thanh toán</span>
                    {order.orderStatus.paidAt && (
                      <span className="lowercase text-[15px] text-gray-800">
                        ({moment(order.orderStatus.paidAt).calendar()})
                      </span>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex flex-col lg:flex-row gap-x-20 gap-y-7 mt-6 md:mt-10">
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
                      to={`/product/${item.slug}`}
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
                      <div className="flex flex-col items-start">
                        <Link to={`/product/${item.slug}`}>
                          <h2 className="lowercase text-lg leading-6 line-clamp-2 md:line-clamp-1 hover:underline">
                            {item.name}
                          </h2>
                        </Link>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="uppercase text-[15px]">
                            {item.size}
                          </span>
                          <span className="text-xs">|</span>
                          <span className="lowercase text-[15px]">
                            {item.color}
                          </span>
                        </div>
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
                        onClick={() => openReviewModalHandle(i)}
                        className={`w-full px-4 py-2  text-sm hover:underline ${
                          order.orderStatus.isReceived && !item.isReview
                            ? "bg-black text-white"
                            : "text-black border border-black pointer-events-none opacity-30"
                        }`}
                      >
                        {item.isReview ? "Đã đánh giá." : "Đánh giá."}
                      </button>
                    </div>

                    <ReviewModal
                      isOpen={i === numberOpenReviewModal}
                      product={item}
                    />
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
                    {order.deliveryInformation.province}
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
                      className="px-4 py-2 bg-gray-50 italic resize-none w-full text-sm outline-none placeholder:lowercase scrollbar-thin"
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

              {!order.orderStatus.isDelivered &&
                !order.orderStatus.isCancelled && (
                  <>
                    <button
                      onClick={() => cancelOrderHandle()}
                      type="button"
                      aria-label="Hủy đơn đặt hàng"
                      className="lowercase mt-10 w-full px-4 py-2 text-sm hover:underline border border-black"
                    >
                      {loadingCancelOrder
                        ? " Đang hủy đơn hàng..."
                        : " Hủy đơn hàng."}
                    </button>
                    <p className="mt-2 lowercase text-[13px]">
                      Lưu ý: Nếu đơn hàng đang được giao thì không thể hủy!
                    </p>
                  </>
                )}
            </section>
          </div>
        </div>
      )}

      <MessageModal type="" />
      <SmallModal result={typeModal === "create_order"} type="" />
      <SmallModal result={typeModal === "cancel_order"} type="" />
      <SmallModal result={typeModal === "review_success"} type="" />
    </main>
  );
};

export default Contents;
