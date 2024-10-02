import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const RatingIconChange = ({ rating, setRating }) => {
  return (
    <div className="flex gap-[6px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="cursor-pointer text-xl"
          onClick={() => {
            setRating(star);
          }}
        >
          {rating >= star ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
        </span>
      ))}
    </div>
  );
};

export default RatingIconChange;
