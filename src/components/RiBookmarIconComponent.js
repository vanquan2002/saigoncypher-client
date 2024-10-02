import React from "react";
import { RiBookmarkFill } from "react-icons/ri";
import { RiBookmarkLine } from "react-icons/ri";
import { addFavoriteUser } from "../redux/actions/UserActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function RiBookmarIconComponent({
  userInfo,
  product,
  redirect,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addFavoriteUserHandle = (product) => {
    const { _id, images, name, price } = product;
    if (!userInfo) {
      navigate(`/login${redirect}`);
    } else {
      dispatch(addFavoriteUser(_id, images[0], name, price));
    }
  };

  return (
    <div className="cursor-pointer">
      {userInfo &&
      userInfo.favorites.find((item) => item.product === product._id) ? (
        <RiBookmarkFill onClick={() => addFavoriteUserHandle(product)} />
      ) : (
        <RiBookmarkLine onClick={() => addFavoriteUserHandle(product)} />
      )}
    </div>
  );
}
