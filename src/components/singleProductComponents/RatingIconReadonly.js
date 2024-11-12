import React from "react";
import { LiaStar } from "react-icons/lia";
import { LiaStarSolid } from "react-icons/lia";

const RatingIconReadonly = ({ rating }) => {
  return (
    <div className="flex gap-[6px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-xl">
          {rating >= star ? (
            <LiaStarSolid className="text-yellow-400" />
          ) : (
            <LiaStar className="text-yellow-400" />
          )}
        </span>
      ))}
    </div>
  );
};

export default RatingIconReadonly;
