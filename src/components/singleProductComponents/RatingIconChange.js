import React from "react";
import { LiaStar } from "react-icons/lia";
import { LiaStarSolid } from "react-icons/lia";

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
            <LiaStarSolid className="text-black" />
          ) : (
            <LiaStar className="text-black" />
          )}
        </span>
      ))}
    </div>
  );
};

export default RatingIconChange;
