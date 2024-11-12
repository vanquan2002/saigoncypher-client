import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import RatingIconReadonly from "./RatingIconReadonly";
import "moment/locale/vi";

const Comments = ({ product }) => {
  moment.locale("vi");
  const commentRefs = useRef([]);
  const [isOverflowing, setIsOverflowing] = useState({});
  const [isCommentMore, setIsCommentMore] = useState(null);

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
    <section className="mt-40">
      <h3 className="mx-5 md:mx-0 lowercase text-xl font-medium">
        Đánh giá về sản phẩm.
      </h3>

      <ul className="mt-5 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {product.reviews.length === 0 ? (
          <li className="text-gray-700 border border-gray-300 p-4">
            Chưa có đánh giá nào cả!
          </li>
        ) : (
          product.reviews.map((review, i) => (
            <li key={i} className="flex gap-3 border border-gray-300 p-4">
              <div className="h-10 min-w-10 text-white bg-black rounded-full flex justify-center items-center mt-2">
                {review.user.name.substring(0, 2)}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                  <span className="font-medium line-clamp-1 overflow-hidden">
                    {review.user.name}
                  </span>
                  <span className="text-[13px] text-gray-800">
                    {moment(review.createdAt).startOf("hour").fromNow()}
                  </span>
                </div>
                <RatingIconReadonly rating={review.rating} />
                <div className="flex flex-col items-start col-span-2 mt-1">
                  <p
                    ref={(el) => (commentRefs.current[i] = el)}
                    className={`italic ${
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
                      className="lowercase underline"
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
          ))
        )}
      </ul>
    </section>
  );
};

export default Comments;
