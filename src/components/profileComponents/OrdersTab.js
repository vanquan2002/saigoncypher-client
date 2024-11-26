import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../redux/actions/OrderActions";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import OrderTabSkeleton from "../skeletons/OrderTabSkeleton";
import Error from "../loadingError/Error";

const OrdersTab = ({ result }) => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, orders, error } = orderListMy;

  useEffect(() => {
    if (result) {
      dispatch(listMyOrders());
    }
  }, [result]);

  return (
    <section className={`lg:mt-10 ${result ? "block" : "hidden"}`}>
      {loading ? (
        <OrderTabSkeleton />
      ) : error ? (
        <div className="mt-5 md:mt-10 px-5 md:px-0">
          <Error error={error} />
        </div>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 lg:gap-y-10">
          {orders.length === 0 ? (
            <span className="lowercase mt-5 md:mt-7 lg:mt-0 mx-5 md:mx-0 text-neutral-500">
              Bạn chưa có đơn hàng nào!
            </span>
          ) : (
            orders.map((item, i) => (
              <li
                key={i}
                className="col-span-1 gap-4 flex border-b border-neutral-300"
              >
                <div className="w-4/5 md:w-full lg:w-4/5 flex items-center">
                  <img
                    className="h-20"
                    src={item.orderItems[0].thumbImage}
                    alt={item.orderItems[0].name}
                  />
                  {item.orderItems.length > 1 && (
                    <span className="text-sm ml-2 md:ml-3">
                      +{item.orderItems.length - 1} sản phẩm khác
                    </span>
                  )}
                </div>

                <div className="w-3/5 flex flex-col gap-2 justify-center">
                  <span className="text-sm lowercase">
                    {item.orderItems.reduce((a, i) => a + i.qty, 0)} sản phẩm
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-sm lowercase hidden md:block">
                      Tổng:
                    </span>
                    {formatCurrency(item.totalPrice)}
                  </span>
                </div>

                <div className="w-3/5 flex flex-col gap-2 justify-center items-end mr-2 md:mr-0">
                  {item.orderStatus.isCancelled ? (
                    <span className="lowercase font-medium text-sm line-clamp-1 bg-red-100">
                      Đã hủy
                    </span>
                  ) : item.orderStatus.isReceived ? (
                    <span className="lowercase font-medium text-sm line-clamp-1 bg-green-100">
                      Đã nhận
                    </span>
                  ) : item.orderStatus.isDelivered ? (
                    <span className="lowercase font-medium text-sm line-clamp-1 bg-green-100">
                      Đang giao
                    </span>
                  ) : (
                    <span className="lowercase font-medium text-sm line-clamp-1 bg-green-100">
                      Đang chuẩn bị
                    </span>
                  )}

                  <Link
                    to={`/order/${item._id}`}
                    aria-label="Đi đến trang chi tiết đơn hàng"
                    className="lowercase text-sm underline"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default OrdersTab;
