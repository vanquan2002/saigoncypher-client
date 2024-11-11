import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./ImageList";
import { formatCurrency } from "../../utils/formatCurrency";
import { useParams } from "react-router";
import { detailsProduct } from "../../redux/actions/ProductActions";
import Error from "../loadingError/Error";
import { addToCart } from "../../redux/actions/CartActions";
import { AppContext } from "../../AppContext";
import RelatedProducts from "./RelatedProducts";
import { PiWarningCircleLight } from "react-icons/pi";
import Breadcrumbs from "../Breadcrumbs";
import { CART_ADD_ITEM_RESET } from "../../redux/constants/CartConstants";
import MessageModal from "../modals/MessageModal";
import ProductDetailSkeleton from "../skeletons/ProductDetailSkeleton";
import SmallModal from "../modals/SmallModal";
import debounce from "lodash.debounce";
import Comments from "./Comments";
import { IoAddSharp } from "react-icons/io5";
import { VscAdd } from "react-icons/vsc";

const Contents = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const cart = useSelector((state) => state.cart);
  const { loading: loadingAddCart, successType } = cart;
  const [size, setSize] = useState("");
  const [isSelectSize, setIsSelectSize] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [numTab, setNumTab] = useState(null);
  const {
    toggleIsMassage,
    isCartModal,
    toggleIsCartModal,
    isSmallModal,
    toggleIsSmallModal,
  } = useContext(AppContext);
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
    { name: "Thông tin sản phẩm", url: "" },
  ];
  const informationTab = [
    { title: "Mô tả sản phẩm", contents: product.description },
    { title: "Chính sách đổi, trả", contents: product.returnPolicy },
    { title: "Hướng dẫn bảo quản", contents: product.storageInstructions },
  ];

  const debouncedAddCartProduct = useMemo(
    () =>
      debounce((id, qty, size, type) => {
        dispatch(addToCart(id, qty, size, type));
      }, 200),
    []
  );

  const addToCartHandle = () => {
    if (isSmallModal) {
      toggleIsSmallModal("");
    }
    if (typeModal) {
      setTypeModal("");
    }
    if (size) {
      debouncedAddCartProduct(id, 1, size, 1);
    } else {
      if (window.innerWidth < 768) {
        setIsSelectSize(true);
      } else {
        toggleIsMassage("Quý khách chưa chọn size!");
      }
    }
  };

  const openTabHandle = (num) => {
    if (numTab === num) {
      setNumTab(null);
    } else {
      setNumTab(num);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setSize("");
    setIsSelectSize(false);
    dispatch(detailsProduct(id));
  }, [id]);

  useEffect(() => {
    if (successType === 1) {
      setSize("");
      toggleIsSmallModal("Thêm vào giỏ hàng thành công!");
      setTypeModal("add_item_cart");
      dispatch({
        type: CART_ADD_ITEM_RESET,
      });
      if (window.innerWidth < 768) {
        toggleIsCartModal(false);
      }
    }
  }, [successType]);

  useEffect(() => {
    const handleResize = () => {
      toggleIsCartModal(false);
      setIsSelectSize(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [product]);

  useEffect(() => {
    if (size && window.innerWidth < 768) {
      setIsSelectSize(false);
    }
  }, [size]);

  return (
    <main>
      <div className="mx-5 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>

      <article>
        {loading ? (
          <div className="md:mx-20 mt-5 md:mt-10">
            <ProductDetailSkeleton />
          </div>
        ) : error ? (
          <div className="mx-5 mt-5 md:mt-10">
            <Error error={error} />
          </div>
        ) : (
          <div className="md:mx-20 mt-5 md:mt-10">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-10 lg:gap-20">
              <section className="w-full lg:w-2/5">
                <ImageList images={product.images} />
              </section>

              <section className="px-5 md:px-0 flex flex-col w-full lg:w-3/5">
                <h1 className="lowercase text-2xl font-medium">
                  {product.name}{" "}
                  <span className="ml-1 bg-yellow-400 text-black text-[13px] font-medium px-1.5 py-1">
                    freeship tp.<span className="uppercase">hcm</span>.
                  </span>
                </h1>
                <div className="mt-1 flex gap-2 items-center">
                  <p className="lowercase">{formatCurrency(product.price)}</p>
                  <span className="text-sm">|</span>
                  <p className="lowercase">{product.color}</p>
                </div>
                <div
                  className={`w-full ${
                    isCartModal ? "block z-30 p-4" : "hidden"
                  } md:block md:mt-8 bg-white fixed left-0 bottom-0 md:static`}
                >
                  <span className="lowercase">Chọn kích cỡ</span>
                  <ul className="mt-2 grid grid-cols-2 gap-3">
                    {product.sizes?.map((item, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          aria-label={`Nhấn chọn size ${item.size}`}
                          onClick={() => setSize(item.size)}
                          className={`text-sm border border-black flex w-full items-center justify-center h-10 uppercase ${
                            item.size === size
                              ? "bg-black text-white"
                              : "text-black hover:bg-gray-100"
                          } duration-200`}
                        >
                          {item.size}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {isSelectSize && (
                    <div className="mt-2 flex items-center gap-1">
                      <PiWarningCircleLight className="text-red-500" />
                      <span className="lowercase md:hidden text-[13px] text-red-500">
                        Qúy khách chưa chọn size!
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-x-2 gap-y-0.5 mt-2">
                    <button
                      type="button"
                      className="lowercase underline text-sm"
                    >
                      Hướng dẫn chọn kích cỡ.
                    </button>
                    <p className="lowercase text-xs text-gray-400">
                      (Số đo người mẫu: cỡ
                      <span className="uppercase ml-1">
                        {product.model.size}
                      </span>
                      , cao {product.model.height})
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Nhấn thêm vào giỏ hàng"
                    className={`w-full h-12 mt-5 md:mt-10 duration-300 flex justify-center items-center border border-black hover:underline ${
                      size ? "bg-black text-white" : "text-black"
                    }`}
                    onClick={() => addToCartHandle()}
                  >
                    {loadingAddCart ? (
                      <span className="lowercase text-[17px]">
                        Đang thêm vào giỏ...
                      </span>
                    ) : (
                      <span className="lowercase text-[17px]">
                        Thêm vào giỏ.
                      </span>
                    )}
                  </button>
                </div>

                <ul className="mt-10 border-t border-gray-300">
                  {informationTab.map((item, i) => (
                    <li key={i} className="border-b border-gray-300">
                      <button
                        type="button"
                        aria-label="Hiển thị nội dung của mô tả sản phẩm"
                        onClick={() => openTabHandle(i + 1)}
                        className="w-full flex items-center justify-between py-2"
                      >
                        <span className="text-[15px] lowercase">
                          {item.title}
                        </span>
                        <VscAdd
                          className={`text-lg transform transition-transform duration-300 ${
                            numTab === i + 1 ? "rotate-45" : "rotate-0"
                          }`}
                        />
                      </button>
                      <p
                        className={`text-sm font-light duration-300 ${
                          numTab === i + 1
                            ? "max-h-[250px] pb-3"
                            : "max-h-0 overflow-hidden "
                        }`}
                      >
                        {item.contents}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <Comments product={product} />
          </div>
        )}
        <RelatedProducts productId={id} />
      </article>

      <MessageModal type="" />
      <SmallModal result={typeModal === "add_item_cart"} type={typeModal} />
    </main>
  );
};

export default Contents;
