import React, { useEffect, useMemo, useState } from "react";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { USER_ADD_FAVORITE_CLEAR } from "../redux/constants/UserConstants";
import debounce from "lodash.debounce";

export default function NotificationComponent({
  successAddFavorite,
  isAddFavorite,
  errorAddFavorite,
}) {
  const [widthClient, setWidthClient] = useState(0);
  const dispatch = useDispatch();
  const threshold = 1;
  const [api, contextHolder] = notification.useNotification({
    stack: {
      threshold,
    },
    top: widthClient < 668 ? 60 : undefined,
    bottom: widthClient >= 668 ? 12 : undefined,
  });
  const openNotification = (placement) => {
    api.open({
      description: errorAddFavorite ? (
        <p className="text-whitePrimary text-xs">{errorAddFavorite}</p>
      ) : isAddFavorite ? (
        <div
          onClick={() => api.destroy()}
          className="flex justify-between items-center"
        >
          <p className="text-whitePrimary text-xs">Đã lưu</p>
          <p className="text-whitePrimary text-xs uppercase cursor-pointer duration-200 hover:text-opacity-60">
            Xem danh sách
          </p>
        </div>
      ) : (
        <p className="text-whitePrimary text-xs">
          Đã xóa sản phẩm khỏi mục yêu thích
        </p>
      ),
      placement,
      duration: 4,
      closeIcon: null,
      style: {
        background: "#1c1c1c",
        fontFamily: "montserrat",
        padding: "6px 20px 12px 20px",
        border: "1px solid #333",
      },
    });
  };

  const debouncedOnChangeSize = useMemo(
    () =>
      debounce(() => {
        setWidthClient(window.innerWidth);
      }, 200),
    []
  );

  const debouncedOpenNotification = useMemo(
    () =>
      debounce(() => {
        openNotification(widthClient >= 668 ? "bottomLeft" : "topLeft");
      }, 100),
    [widthClient, isAddFavorite]
  );

  useEffect(() => {
    if (successAddFavorite) {
      api.destroy();
      debouncedOpenNotification();
      dispatch({
        type: USER_ADD_FAVORITE_CLEAR,
      });
    }
  }, [successAddFavorite]);

  useEffect(() => {
    setWidthClient(window.innerWidth);
    window.addEventListener("resize", debouncedOnChangeSize);
    return () => {
      window.removeEventListener("resize", debouncedOnChangeSize);
      debouncedOnChangeSize.cancel();
    };
  }, []);

  return <div>{contextHolder}</div>;
}
