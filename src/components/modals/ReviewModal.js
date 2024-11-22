import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/ProductConstants";
import RatingIconChange from "../singleProductComponents/RatingIconChange";
import { AppContext } from "../../AppContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { createProductReview } from "../../redux/actions/ProductActions";
import MessageModal from "./MessageModal";
import { MdClose } from "react-icons/md";
import debounce from "lodash.debounce";
import { PiWarningCircleLight } from "react-icons/pi";

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

  const debouncedCreateReview = useMemo(
    () =>
      debounce((id, contents) => {
        dispatch(createProductReview(id, contents));
      }, 200),
    []
  );

  const submitReviewHandle = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      debouncedCreateReview(product.product, { rating, comment });
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
        className=" bg-white border border-gray-300 w-full md:w-2/3 lg:w-1/2 mx-3 md:mx-0 pt-3 pb-5 px-5"
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

        <div className="flex flex-col md:flex-row items-start md:items-center gap-1.5 md:gap-2 mt-4">
          <span className="lowercase text-sm mr-1">Xếp hạng:</span>
          <div className="flex items-center gap-2">
            <RatingIconChange rating={rating} setRating={setRating} />
            <span className="lowercase text-xs text-gray-600">
              ({desc[rating - 1]})
            </span>
          </div>
        </div>

        <form title="Form đánh giá sản phẩm" onSubmit={submitReviewHandle}>
          <div className="flex flex-col md:flex-row items-start gap-1 md:gap-4 mt-2">
            <span className="lowercase text-sm text-nowrap">Nội dung:</span>
            <div className="w-full flex flex-col gap-1.5">
              <textarea
                aria-label="Nhập nội dung đánh giá"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhập nội dung"
                className="mt-2 resize-none w-full px-2 py-1 border border-black bg-transparent text-sm outline-none placeholder:lowercase scrollbar-thin"
                maxLength={500}
                cols="30"
                rows="3"
              ></textarea>
              {!isComment && (
                <div className="flex items-center gap-1">
                  <PiWarningCircleLight className="text-red-500" />
                  <span className="text-xs text-red-500">
                    Chưa nhập nội dung đánh giá
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="reset"
              aria-label="Làm mới form đánh giá"
              onClick={() => resetReviewHandle()}
              className="lowercase text-[13px] hover:bg-gray-100 text-center w-1/3 md:w-1/4 lg:w-1/5 py-1.5 border border-black"
            >
              làm mới.
            </button>
            <button
              type="submit"
              aria-label="Gửi đánh giá"
              className="lowercase text-[13px] hover:opacity-80 text-center w-1/3 md:w-1/4 lg:w-1/5 py-1.5 bg-black text-white"
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
