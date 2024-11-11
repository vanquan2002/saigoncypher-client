import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/ProductConstants";
import RatingIconChange from "../singleProductComponents/RatingIconChange";
import { AppContext } from "../../AppContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { createProductReview } from "../../redux/actions/ProductActions";
import { detailsOrder } from "../../redux/actions/OrderActions";
import MessageModal from "./MessageModal";
import { MdClose } from "react-icons/md";

const ReviewModal = ({ isOpen, product }) => {
  moment.locale("vi");
  const desc = ["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(true);
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { loading, success, error } = productCreateReview;
  const { isReviewModal, toggleIsReviewModal, toggleIsMassage } =
    useContext(AppContext);

  const submitReviewHandle = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(createProductReview(product.product, { rating, comment }));
    } else {
      setIsComment(false);
    }
  };

  const resetReviewHandle = () => {
    setRating(5);
    setComment("");
    setIsComment(true);
  };

  useEffect(() => {
    if (success) {
      setRating(5);
      setComment("");
      toggleIsReviewModal(false);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toggleIsReviewModal(false);
      toggleIsMassage(error);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [error]);

  useEffect(() => {
    document.body.style.overflow = isReviewModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isReviewModal]);

  useEffect(() => {
    if (comment.trim()) {
      setIsComment(true);
    }
  }, [comment]);

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
        className=" bg-white border border-black w-full md:w-2/3 lg:w-1/2 mx-3 md:mx-0 pt-3 pb-5 px-5"
      >
        <div className="flex items-center justify-between">
          <h4 className="lowercase text-lg font-medium">Đánh giá sản phẩm.</h4>
          <button
            type="button"
            aria-label="Đóng form đánh giá"
            onClick={() => toggleIsReviewModal(false)}
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <div className="flex gap-3 mt-4">
          <img
            src={product.thumbImage}
            title={product.name}
            alt={`Hình ảnh của ${product.name}`}
            className="w-9"
          />
          <div className="flex flex-col">
            <span className="lowercase text-sm">{product.name}</span>
            <span className="lowercase text-sm">
              {product.color} | {formatCurrency(product.price)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="lowercase text-sm mr-1">Xếp hạng:</span>
          <RatingIconChange rating={rating} setRating={setRating} />
          <span className="lowercase text-xs text-gray-600">
            ({desc[rating - 1]})
          </span>
        </div>

        <form
          title="Form đánh giá sản phẩm"
          onSubmit={(e) => submitReviewHandle(e)}
        >
          <div className="flex items-start gap-3 md:gap-4 mt-1.5">
            <span className="lowercase text-sm text-nowrap">Nội dung:</span>
            <div className="w-full flex flex-col gap-1.5">
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
              {!isComment && (
                <span className="lowercase text-red-600 text-sm">
                  Chưa nhập nội dung đánh giá!
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="reset"
              aria-label="Làm mới form đánh giá"
              onClick={() => resetReviewHandle()}
              className="lowercase text-[13px] hover:underline text-center w-1/3 md:w-1/4 lg:w-1/5 py-1.5 border border-black"
            >
              làm mới.
            </button>
            <button
              type="submit"
              aria-label="Gửi đánh giá"
              className="lowercase text-[13px] hover:underline text-center w-1/3 md:w-1/4 lg:w-1/5 py-1.5 bg-black text-white"
            >
              {loading ? "Đang đăng." : "Đăng."}
            </button>
          </div>
        </form>
      </div>

      <MessageModal type="" />
    </div>
  );
};

export default ReviewModal;
