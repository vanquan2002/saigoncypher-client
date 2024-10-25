import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../redux/actions/UserActions";
import { FaUser } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Thông tin cá nhân", url: "" },
  ];
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const changeImgHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageUrl(file);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(profile());
  }, []);

  return (
    <main className="md:px-20">
      <div className="mx-5 md:mx-0 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h3 className="border-t border-gray-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Thông tin cá nhân.
      </h3>
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>Error</span>
      ) : (
        <div>
          <section className="mt-5 md:mt-10 pt-10 flex gap-10 items-center">
            <form className="relative h-32 min-w-32">
              <label
                className="h-full w-full rounded-full overflow-hidden flex justify-center items-center bg-gray-100"
                htmlFor="file_input"
              >
                {user.avatar || image ? (
                  <img
                    className="object-cover h-full w-full"
                    src={image ? image : user.avatar}
                    alt=""
                  />
                ) : (
                  <FaUser size="2.3rem" className="text-gray-500" />
                )}
              </label>
              <input
                onChange={changeImgHandle}
                hidden
                type="file"
                id="file_input"
              />
              {user.avatar || image ? (
                <div className="absolute bottom-0 right-4 h-7 w-7 flex items-center justify-center bg-gray-500 rounded-full">
                  <BiSolidEditAlt className="text-2xl p-0.5 text-gray-100" />
                </div>
              ) : (
                <div className="absolute bottom-0 right-4 h-7 w-7 flex items-center justify-center bg-gray-500 rounded-full">
                  <RiAddLine className="text-3xl p-0.5 text-gray-100" />
                </div>
              )}
            </form>

            <div className="w-full">
              <div className="flex justify-between items-center mb-1 w-full">
                <h1 className="text-3xl font-semibold">{user.name}</h1>
                <button
                  aria-label="Các đơn hàng đã đặt"
                  type="button"
                  className="lowercase border border-black px-2 py-1 text-sm hover:underline"
                >
                  Đăng xuất.
                </button>
              </div>
              <span className="text-[15px]">{user.email}</span>

              <div className="flex gap-3 mt-5">
                <button
                  aria-label="Chỉnh sửa thông tin cá nhân"
                  type="button"
                  className="lowercase border border-black px-4 py-2 hover:underline"
                >
                  Chỉnh sửa thông tin cá nhân.
                </button>
                <button
                  aria-label="Các đơn hàng đã đặt"
                  type="button"
                  className="lowercase border border-black px-4 py-2 hover:underline"
                >
                  Đơn hàng đã đặt.
                </button>
              </div>
            </div>
          </section>

          <section className="w-full border-t border-gray-300 pt-5 md:pt-10 mt-5 md:mt-10"></section>
        </div>
      )}
    </main>
  );
};

export default Contents;
