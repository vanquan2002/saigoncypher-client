import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../redux/actions/OrderActions";
import moment from "moment";
import "moment/locale/vi";

const OrdersTab = ({ result }) => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, orders, error } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
  }, []);

  return (
    <section
      className={`mx-5 md:mx-0 mt-7 md:mt-10 ${result ? "block" : "hidden"}`}
    >
      {loading ? (
        <span>loading...</span>
      ) : error ? (
        <span>error</span>
      ) : (
        <ul className="grid grid-cols-2 gap-x-10 gap-y-5">
          {orders.map((item, i) => (
            <li
              key={i}
              className="col-span-1 flex items-center gap-4 h-16 w-full border-b border-gray-300"
            >
              <div className="flex items-center">
                {item.orderItems.map((item, i) => (
                  <img
                    key={i}
                    className="w-9"
                    src={item.thumbImage}
                    alt={item.name}
                  />
                ))}
              </div>

              {item.orderStatus.isCancelled ? (
                <span className="lowercase text-sm">Đã hủy.</span>
              ) : item.orderStatus.isPaid ? (
                <span className="lowercase text-sm">Đã thanh toán.</span>
              ) : item.orderStatus.isReceived ? (
                <span className="lowercase text-sm">Đã nhận.</span>
              ) : item.orderStatus.isDelivered ? (
                <span className="lowercase text-sm">Đang giao.</span>
              ) : (
                <span className="lowercase text-sm">Đang chuẩn bị.</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default OrdersTab;
