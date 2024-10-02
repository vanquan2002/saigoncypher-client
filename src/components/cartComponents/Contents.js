import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/CartActions";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import debounce from "lodash.debounce";
import { formatCurrency } from "../../utils/formatCurrency";

const Contents = ({ cartItems, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const [newQtys, setNewQtys] = useState([]);
  const [newSizes, setNewSizes] = useState([]);
  const checkOutHandle = () => {
    navigate("/login?redirect=shipping");
  };
  const navigateProductHandle = (id) => {
    navigate(`/products/${id}/detail`);
  };
  const navigateProductsHandle = () => {
    navigate(`/products`);
  };
  const debouncedOnChange = useMemo(
    () =>
      debounce((productId, newQty, size, sizeUpdate = "") => {
        dispatch(addToCart(productId, parseInt(newQty), size, sizeUpdate));
      }, 700),
    []
  );
  const quantityChangeHandle = (productId, size, e, index) => {
    const newQty = e.target.value;
    if (newQty !== "" && !isNaN(newQty) && newQty > 0) {
      if (newQty > 49) {
        setNewQtys((prev) => {
          const updatedQtys = [...prev];
          updatedQtys[index] = 50;
          return updatedQtys;
        });
        debouncedOnChange(productId, 50, size);
      } else {
        setNewQtys((prev) => {
          const updatedQtys = [...prev];
          updatedQtys[index] = newQty;
          return updatedQtys;
        });
        debouncedOnChange(productId, newQty, size);
      }
    } else {
      setNewQtys((prev) => {
        const updatedQtys = [...prev];
        updatedQtys[index] = newQty;
        return updatedQtys;
      });
      debouncedOnChange(productId, 1, size);
    }
  };
  const increment = (productId, size, index) => {
    setNewQtys((prev) => {
      const updatedQtys = [...prev];
      updatedQtys[index] = parseInt(updatedQtys[index]) + 1;
      return updatedQtys;
    });
    debouncedOnChange(productId, parseInt(newQtys[index]) + 1, size);
  };
  const decrement = (productId, size, index) => {
    setNewQtys((prev) => {
      const updatedQtys = [...prev];
      updatedQtys[index] = parseInt(updatedQtys[index]) - 1;
      return updatedQtys;
    });
    debouncedOnChange(productId, parseInt(newQtys[index]) - 1, size);
  };
  const removeFromCartHandle = (id, size) => {
    dispatch(removeFromCart(id, size));
  };
  const sizeChangeHandle = (productId, qty, size, sizeUpdate, index) => {
    if (size !== sizeUpdate) {
      setNewSizes((prev) => {
        const updatedSizes = [...prev];
        updatedSizes[index] = sizeUpdate;
        return updatedSizes;
      });
      debouncedOnChange(productId, qty, size, sizeUpdate);
    }
  };

  useEffect(() => {
    setNewQtys(cartItems.map((item) => item.qty));
    setNewSizes(cartItems.map((item) => item.size));
    return () => {
      debouncedOnChange.cancel();
    };
  }, [cartItems, debouncedOnChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 lg:gap-28 md:p-10 lg:px-12 mt-6 md:mt-0">
      <div className="col-span-1">
        <div className="">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center mt-10">
              <p className="text-whitePrimary text-opacity-45">
                Giỏ hàng của bạn đang trống
              </p>
              <button
                onClick={navigateProductsHandle}
                className="w-2/4 py-4 mt-3 bg-firePrimary font-bold text-base uppercase text-darkPrimary"
              >
                Tiếp tục mua hàng
              </button>
            </div>
          ) : (
            <div className="">
              {cartItems.map((item, i) => (
                <div
                  className={`flex items-center gap-6 ${
                    cartItems.length - 1 > i &&
                    "border-b border-darkPrimary border-opacity-15 md:pb-4 md:mb-4"
                  }`}
                  key={i}
                >
                  <img
                    onClick={() => navigateProductHandle(item.product)}
                    className="w-36 cursor-pointer"
                    src={item.image}
                    alt=""
                  />
                  <div className="flex w-full justify-center items-start gap-3">
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex">
                        <p
                          onClick={() => navigateProductHandle(item.product)}
                          className="line-clamp-1 font-medium text-base cursor-pointer text-darkPrimary"
                        >
                          {item.name}
                        </p>
                      </div>
                      <p className="text-darkPrimary text-sm text-opacity-70">
                        {formatCurrency(item.price)} VND
                      </p>
                      <div className="flex justify-between items-center pr-0 mt-2">
                        <div className="flex flex-col w-full">
                          <div
                            id="buttonSizeElement"
                            data={item.size}
                            className="flex gap-4"
                          >
                            {item.sizes.map((sizeItem, indexSize) => (
                              <div
                                onClick={() =>
                                  sizeChangeHandle(
                                    item.product,
                                    item.qty,
                                    item.size,
                                    sizeItem,
                                    i
                                  )
                                }
                                key={indexSize}
                                className={`cursor-pointer flex justify-center items-center hover:bg-darkPrimary hover:bg-opacity-15 duration-200 ${
                                  sizeItem === newSizes[i]
                                    ? "bg-darkPrimary"
                                    : "bg-whitePrimary"
                                } border border-darkPrimary border-opacity-60 w-8 h-8`}
                              >
                                <button
                                  className={`uppercase ${
                                    sizeItem === newSizes[i]
                                      ? "text-whitePrimary"
                                      : "text-darkPrimary"
                                  }`}
                                >
                                  {sizeItem}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-darkPrimary text-opacity-60 font-medium">
                          {item.color}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pr-0 mt-3">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              decrement(item.product, item.size, i)
                            }
                            className={`${
                              newQtys[i] <= 1 &&
                              "opacity-30 pointer-events-none"
                            } flex cursor-pointer w-9 h-8 justify-center items-center border-t border-l border-b border-black border-opacity-50 duration-200 hover:bg-darkPrimary hover:bg-opacity-15`}
                          >
                            <AiOutlineMinus color="#000" size="0.8rem" />
                          </button>
                          <div className="">
                            <input
                              id="inputQtyElement"
                              data={item.qty}
                              className="w-9 h-8 bg-whitePrimary text-black text-base text-center outline-none border-black border border-opacity-50"
                              type="text"
                              value={newQtys[i] || ""}
                              onChange={(e) =>
                                quantityChangeHandle(
                                  item.product,
                                  item.size,
                                  e,
                                  i
                                )
                              }
                            />
                          </div>
                          <button
                            onClick={() =>
                              increment(item.product, item.size, i)
                            }
                            className={`${
                              newQtys[i] > 49 &&
                              "opacity-30 pointer-events-none"
                            } flex cursor-pointer w-9 h-8 justify-center items-center border-t border-r border-b border-black border-opacity-50 duration-200 hover:bg-darkPrimary hover:bg-opacity-15`}
                          >
                            <AiOutlinePlus color="#000" size="0.8rem" />
                          </button>
                        </div>
                        <p className="text-sm text-darkPrimary font-medium">
                          {formatCurrency(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-1 rounded-full flex justify-center items-center border border-black"
                      onClick={() =>
                        removeFromCartHandle(item.product, item.size)
                      }
                    >
                      <MdClose
                        size="1rem"
                        className="cursor-pointer text-black"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-1">
        <div className="sticky top-28">
          <div className="relative w-full min-w-[200px] mt-10 mb-8">
            <textarea
              className="peer h-full min-h-[100px] w-full resize-none border border-darkPrimary border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-darkPrimary outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-darkPrimary placeholder-shown:border-t-darkPrimary focus:border-2 focus:border-darkPrimary focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-darkPrimary"
              placeholder=" "
            ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-darkPrimary transition-all before:pointer-events-none before:mt-[6px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:border-t before:border-l before:border-darkPrimary before:transition-all after:pointer-events-none after:mt-[6px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:border-t after:border-r after:border-darkPrimary after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-darkPrimary peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-darkPrimary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-darkPrimary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-darkPrimary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-darkPrimary peer-disabled:peer-placeholder-shown:text-darkPrimary">
              Ghi chú
            </label>
          </div>
          <div className="flex items-end justify-between">
            <p className="uppercase text-base text-darkPrimary">Tổng tiền:</p>
            <p className="text-2xl font-medium text-darkPrimary">{total} VND</p>
          </div>
          <div className="flex items-center justify-between mt-8 gap-6">
            <button
              onClick={navigateProductsHandle}
              className="w-full py-4 bg-darkPrimary text-base uppercase hover:underline text-whitePrimary"
            >
              Tiếp tục mua hàng
            </button>
            <button
              className={`${
                loading && "pointer-events-none opacity-65"
              } w-full py-4 bg-darkPrimary text-base uppercase hover:underline text-whitePrimary`}
              onClick={checkOutHandle}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;
