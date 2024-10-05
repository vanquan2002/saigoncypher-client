import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createProductReview,
  detailsProduct,
} from "./../../redux/actions/ProductActions";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import moment from "moment";
import "moment/locale/vi";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/ProductConstants";
import RatingIconChange from "./RatingIconChange";
import RatingIconReadonly from "./RatingIconReadonly";
import MessageModal from "../MessageModal";
import { AppContext } from "../../AppContext";

const Reviews = ({ product }) => {
  moment.locale("vi");
  const desc = ["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commentRefs = useRef([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { loading, success, error } = productCreateReview;
  const { isMassage, toggleIsMassage } = useContext(AppContext);
  const [isOverflowing, setIsOverflowing] = useState({});
  const [isCommentMore, setIsCommentMore] = useState(null);

  const submitReviewHandle = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(createProductReview(product._id, { rating, comment }));
    } else {
      toggleIsMassage("comment");
    }
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
      dispatch(detailsProduct(product._id));
    }
    if (error) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [success, product]);

  useEffect(() => {
    commentRefs.current.forEach((descriptionElement, index) => {
      if (descriptionElement) {
        const computedStyle = window.getComputedStyle(descriptionElement);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const totalHeight = descriptionElement.scrollHeight;
        const lines = Math.round(totalHeight / lineHeight);
        const isOverflowing = lines > 3;
        setIsOverflowing((prev) => ({
          ...prev,
          [index]: isOverflowing,
        }));
      }
    });
  }, [product]);

  return (
    <div className="mt-40">
      <h6 className="uppercase font-medium">Đánh giá sản phẩm này</h6>
      {loading && (
        <div className="mt-5">
          <Loading loading={loading} />
        </div>
      )}
      {error && (
        <div className="mt-5">
          <Message error={error} />
        </div>
      )}
      {userInfo ? (
        <div className="flex flex-col mt-5">
          <div className="flex items-center gap-3">
            <p className="text-[15px]">Xếp hạng:</p>
            <RatingIconChange rating={rating} setRating={setRating} />
            {rating ? (
              <span className="text-sm">
                {"("}
                {desc[rating - 1]}
                {")"}
              </span>
            ) : null}
          </div>
          <form onSubmit={(e) => submitReviewHandle(e)}>
            <div className="relative w-full mt-4">
              <textarea
                onChange={(e) => setComment(e.target.value)}
                className="peer h-full min-h-[100px] w-full resize-none border border-black border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-black placeholder-shown:border-t-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                value={comment}
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Nội dung
              </label>
            </div>

            <div className="flex w-full justify-end gap-3 mt-2">
              <button
                className="uppercase text-xs md:text-[13px] font-medium text-black border border-black px-3 md:px-4 py-[6px] hover:text-opacity-60"
                type="button"
                onClick={() => resetReview()}
              >
                Hủy
              </button>
              <button
                className="uppercase text-xs md:text-[13px] font-medium bg-black text-white px-3 md:px-4 py-[6px] hover:text-opacity-60"
                disabled={loading}
                type="submit"
              >
                Đăng
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p className="mt-5">
          Hãy
          <span
            className="font-medium underline px-1 cursor-pointer"
            onClick={() =>
              navigate(`/login?redirect=products/${product._id}/detail`)
            }
          >
            đăng nhập
          </span>
          để bình luận!
        </p>
      )}

      <div className="bg-gray-50 mt-16 p-5 flex flex-col gap-12">
        {product.reviews.length === 0 ? (
          <p className="text-sm text-gray-700">Chưa có đánh giá nào{"!"}</p>
        ) : (
          product.reviews.map((review, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-10 min-w-10 text-white bg-black rounded-full flex justify-center items-center mt-2">
                {review.name.substring(0, 2)}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                  <p className="font-medium line-clamp-1 overflow-hidden">
                    {review.name}
                  </p>
                  <span className="text-[13px] text-gray-800">
                    {moment(review.createdAt).startOf("hour").fromNow()}
                  </span>
                </div>
                <RatingIconReadonly rating={review.rating} />
                <div className="flex flex-col items-start col-span-2 mt-1">
                  <p
                    ref={(el) => (commentRefs.current[i] = el)}
                    className={`italic text-[15px] ${
                      isCommentMore === i ? "line-clamp-none" : "line-clamp-3"
                    }`}
                  >
                    {review.comment}
                  </p>

                  {isOverflowing[i] && (
                    <button
                      className="relative text-[15px] bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500"
                      onClick={() =>
                        setIsCommentMore(isCommentMore === i ? null : i)
                      }
                    >
                      {isCommentMore === i ? "Rút gọn" : "Xem thêm"}
                      <span className="absolute left-0 right-0 bottom-[1.5px] h-[1.5px] bg-gray-400"></span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isMassage === "comment" && (
        <MessageModal message="Quý khách chưa nhập nội dung đánh giá!" />
      )}
    </div>
  );
};

export default Reviews;
