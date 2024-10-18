import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { MdClose } from "react-icons/md";
import { removeFromCart } from "../../redux/actions/CartActions";
import Breadcrumbs from "../Breadcrumbs";

const Contents = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Giỏ hàng", url: "" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-40 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Giỏ hàng của bạn.
      </h3>
      {cartItems.length === 0 ? (
        <h4 className="mt-5 md:mt-10 lowercase text-lg px-6 py-4 border border-black">
          Giỏ hàng của bạn đang trống!
        </h4>
      ) : (
        <div className="mt-5 md:mt-10 grid grid-cols-2">
          <section className="col-span-1 bg-yellow-300">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-5 ${
                  cartItems.length - 1 > i && "border-b border-gray-300"
                } `}
              >
                <Link to={`/products/${item.product}/detail`}>
                  <img
                    className="w-16"
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
                    type="button"
                    aria-label={`Xóa sản phẩm ${item.name} - ${item.size} khỏi giỏ hàng của bạn`}
                    onClick={() =>
                      dispatch(removeFromCart(item.product, item.size))
                    }
                  >
                    <MdClose className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </section>

          <section className="col-span-1 bg-red-300"></section>
        </div>
      )}

      <section></section>
    </main>
  );
};

export default Contents;
