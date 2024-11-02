import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../redux/actions/OrderActions";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { MdArrowOutward } from "react-icons/md";

const OrdersTab = ({ result }) => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, orders, error } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
  }, []);

  return (
    <section className={`lg:mt-10 ${result ? "block" : "hidden"}`}>
      {loading ? (
        <span>loading...</span>
      ) : error ? (
        <span>error</span>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 lg:gap-y-10">
          {orders.map((item, i) => (
            <li
              key={i}
              className="col-span-1 flex items-center justify-between gap-3 h-[88px] md:h-32 lg:h-20 w-full border-b border-gray-300"
            >
              <div className="w-1/4 md:w-1/3 h-full mr-5 lg:mr-0 flex items-center">
                <img
                  className="h-full"
                  src={item.orderItems[0].thumbImage}
                  alt={item.orderItems[0].name}
                />
                {item.orderItems.length > 1 && (
                  <span className="text-sm ml-1 md:ml-3">
                    +{item.orderItems.length - 1}
                  </span>
                )}
              </div>

              <div className="w-2/5 h-full pt-3 pb-2 md:pb-4 md:pt-5 lg:pb-2 lg:pt-1 flex flex-col items-start justify-between">
                {item.orderStatus.isCancelled ? (
                  <span className="lowercase  font-medium text-sm line-clamp-1 bg-red-100">
                    Đã hủy
                  </span>
                ) : item.orderStatus.isPaid ? (
                  <span className="lowercase  font-medium text-sm line-clamp-1 bg-green-100">
                    Đã thanh toán
                  </span>
                ) : item.orderStatus.isReceived ? (
                  <span className="lowercase  font-medium text-sm line-clamp-1 bg-green-100">
                    Đã nhận
                  </span>
                ) : item.orderStatus.isDelivered ? (
                  <span className="lowercase  font-medium text-sm line-clamp-1 bg-green-100">
                    Đang giao
                  </span>
                ) : (
                  <span className="lowercase  font-medium text-sm line-clamp-1 bg-green-100">
                    Đang chuẩn bị
                  </span>
                )}

                <div className="flex flex-col">
                  <span className="text-[13px] lowercase">
                    {item.orderItems.reduce((a, i) => a + i.qty, 0)} sản phẩm
                  </span>
                  <span className="text-sm lowercase line-clamp-1">
                    Tổng: {formatCurrency(item.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="w-3/5 h-full pt-3 pb-2 md:pb-4 md:pt-5 lg:pb-2 lg:pt-1 mr-1 flex flex-col justify-between items-end">
                <div className="flex gap-[6px] md:gap-3">
                  <button
                    type="button"
                    aria-label="Hủy đơn đặt hàng"
                    className="lowercase px-2 md:px-4 py-2 text-sm hover:underline border border-black"
                  >
                    Mua lại
                  </button>
                  <button
                    type="button"
                    aria-label="Hủy đơn đặt hàng"
                    className="lowercase px-2 md:px-4 py-2 text-sm hover:underline text-white bg-black"
                  >
                    Đánh giá
                  </button>
                </div>

                <Link
                  to={`/order/${item._id}`}
                  aria-label="Đi đến trang chi tiết đơn hàng"
                  className="flex items-center text-sm hover:underline"
                >
                  <span>Xem chi tiết</span>
                  <MdArrowOutward />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default OrdersTab;
