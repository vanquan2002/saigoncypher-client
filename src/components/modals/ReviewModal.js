import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/ProductConstants";
import RatingIconChange from "../singleProductComponents/RatingIconChange";
import { AppContext } from "../../AppContext";

const ReviewModal = ({ isOpen, products }) => {
  moment.locale("vi");
  const desc = ["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { loading, success, error } = productCreateReview;
  const { isReviewModal, toggleIsReviewModal } = useContext(AppContext);

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
        className="bg-white border border-black"
      >
        <div className="flex flex-col border-b border-black">
          <span className="lowercase text-lg font-medium">
            Đánh giá sản phẩm.
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[15px]">Xếp hạng:</span>
            <RatingIconChange rating={rating} setRating={setRating} />
            <span className="text-sm">({desc[rating - 1]})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[15px]">Nội dung:</span>
            <textarea
              aria-label="Nhập lời nhắn của bạn"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập lời nhắn"
              className="mt-2 resize-none w-full px-3 py-2 border border-gray-300 bg-transparent text-sm outline-none placeholder:lowercase"
              maxLength={200}
              cols="30"
              rows="3"
            ></textarea>
            <p className="text-xs text-gray-500 text-right">
              {comment.length}/200 ký tự
            </p>
          </div>
        </div>
        <button className="flex">
          <span className="lowercase text-[15px]">Hủy.</span>
          <span className="lowercase text-[15px]">Đăng.</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
