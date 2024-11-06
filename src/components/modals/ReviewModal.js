import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/ProductConstants";
import RatingIconChange from "../singleProductComponents/RatingIconChange";
import { AppContext } from "../../AppContext";
import { formatCurrency } from "../../utils/formatCurrency";

const ReviewModal = ({ isOpen, products }) => {
  moment.locale("vi");
  const desc = ["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { loading, success, error } = productCreateReview;
  const { isReviewModal, toggleIsReviewModal } = useContext(AppContext);
  const uniqueProducts = [
    ...new Map(products.map((item) => [item.product, item])).values(),
  ];

  const submitReviewHandle = (e) => {
    e.preventDefault();
    // if (comment) {
    //   dispatch(createProductReview(product._id, { rating, comment }));
    // }
  };
  const resetReview = () => {
    setRating(5);
    setComment("");
  };

  useEffect(() => {
    if (success) {
      window.scrollTo({ top: 0 });
      setRating(5);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      // dispatch(detailsProduct(product._id));
    }
    if (error) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [success]);

  useEffect(() => {
    document.body.style.overflow = isReviewModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isReviewModal]);

  return (
    <div
      onClick={() => toggleIsReviewModal(false)}
      className={`z-20 ${
        isReviewModal && isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white border border-black w-full md:w-2/3 lg:w-1/2 h-[calc(30%+40px)] md:h-1/4 lg:h-2/5 mx-2 md:mx-0 overflow-auto scrollbar-thin"
      >
        <div className="pt-3 pb-2 px-5 sticky top-0 left-0 w-full backdrop-blur-sm bg-white/30">
          <span className="lowercase text-lg font-medium">
            Đánh giá sản phẩm.
          </span>
        </div>
        <ul className="mt-3 pb-7 px-5 flex flex-col gap-5">
          {uniqueProducts.map((item, i) => (
            <li
              key={i}
              className={`${
                uniqueProducts.length - 1 !== i &&
                "border-b border-gray-300 pb-5"
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.thumbImage}
                  title={item.name}
                  alt={`Hình ảnh của ${item.name}`}
                  className="w-9"
                />
                <div className="flex flex-col">
                  <h2 className="lowercase text-sm">{item.name}.</h2>
                  <span className="lowercase text-sm">
                    {item.color} | {formatCurrency(item.price)}
                  </span>
                </div>
              </div>

              {item.isReview ? (
                <span>Bạn đã đánh giá sản phẩm này</span>
              ) : (
                <>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="lowercase text-sm mr-1">Xếp hạng:</span>
                    <RatingIconChange rating={rating} setRating={setRating} />
                    <span className="lowercase text-xs text-gray-600">
                      ({desc[rating - 1]})
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mt-0.5">
                    <span className="lowercase text-sm text-nowrap">
                      Nội dung:
                    </span>
                    <textarea
                      aria-label="Nhập lời nhắn của bạn"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Nhập lời nhắn"
                      className="mt-2 resize-none w-full px-2 py-1 border border-black bg-transparent text-sm outline-none placeholder:lowercase scrollbar-thin"
                      maxLength={500}
                      cols="30"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      type="button"
                      className="lowercase text-[13px] hover:underline text-center px-6 py-1.5 border border-black"
                    >
                      Hủy.
                    </button>
                    <button
                      type="button"
                      className="lowercase text-[13px] hover:underline text-center px-6 py-1.5 bg-black text-white"
                    >
                      Đăng.
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewModal;
