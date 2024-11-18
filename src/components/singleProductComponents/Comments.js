import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import RatingIconReadonly from "./RatingIconReadonly";
import "moment/locale/vi";
import { LiaStarSolid } from "react-icons/lia";

const Comments = ({ product }) => {
  moment.locale("vi");
  const commentRefs = useRef([]);
  const [isOverflowing, setIsOverflowing] = useState({});
  const [isCommentMore, setIsCommentMore] = useState(null);

  useEffect(() => {
    const checkOverflowingHandle = () => {
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
    };
    checkOverflowingHandle();
    window.addEventListener("resize", checkOverflowingHandle);
    return () => {
      window.removeEventListener("resize", checkOverflowingHandle);
    };
  }, [product]);

  return (
    <section className="mt-40">
      <div className="mx-5 md:mx-0 flex">
        <h3 className="lowercase text-xl font-medium pr-1">
          {product.numReviews !== 0 && (
            <span className="mr-1.5">{product.numReviews}</span>
          )}
          đánh giá về sản phẩm
        </h3>
        (
        <div className="flex items-center gap-0.5">
          <LiaStarSolid className="text-yellow-400 text-lg" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-sm font-medium">/</span>
          <span className="font-medium">5</span>
        </div>
        )
      </div>

      {product.reviews.length === 0 ? (
        <div className="mt-3 md:mt-6 px-5 md:px-0">
          <span className=" text-gray-700 lowercase">
            Chưa có đánh giá nào cả!
          </span>
        </div>
      ) : (
        <ul className="mt-5 md:mt-10 grid grid-cols-1 lg:grid-cols-2 md:gap-5 overflow-hidden">
          {product.reviews.map((review, i) => (
            <li
              key={i}
              className={`flex gap-3 ${
                product.reviews.length - 1 !== i && "border-b-0 md:border-b"
              } border border-gray-300 p-4`}
            >
              {review.user.avatar ? (
                <img
                  src={review.user.avatar}
                  alt={`Ảnh đại diện của ${review.user.name}`}
                  title={`Ảnh đại diện của ${review.user.name}`}
                  className="h-10 w-10 object-cover rounded-full mt-2"
                />
              ) : (
                <div className="h-10 min-w-10 bg-black rounded-full flex justify-center items-center mt-2">
                  <span className="text-white">
                    {review.user.name.substring(0, 2)}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center gap-2">
                  <h2 className="line-clamp-1 overflow-hidden">
                    {review.user.name}
                  </h2>
                  <span className="text-xs text-nowrap lowercase text-gray-500">
                    {moment(review.createdAt).calendar()}
                  </span>
                </div>
                <RatingIconReadonly rating={review.rating} />
                <div className="flex flex-col items-start col-span-2 mt-1">
                  <p
                    ref={(el) => (commentRefs.current[i] = el)}
                    className={`text-sm font-light italic ${
                      isCommentMore === i ? "line-clamp-none" : "line-clamp-3"
                    }`}
                  >
                    {review.comment}
                  </p>

                  {isOverflowing[i] && (
                    <button
                      type="button"
                      aria-label={`${
                        isCommentMore ? "Rút gọn" : "Xem thêm"
                      } nội dung đánh giá`}
                      className="lowercase underline text-sm font-light"
                      onClick={() =>
                        setIsCommentMore(isCommentMore === i ? null : i)
                      }
                    >
                      {isCommentMore === i ? "Rút gọn" : "Xem thêm"}
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Comments;
