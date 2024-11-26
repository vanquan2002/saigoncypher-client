import React from "react";
import Breadcrumbs from "../Breadcrumbs";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Giới thiệu về chúng tôi", url: "" },
  ];

  return (
    <main>
      <div className="px-5 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h1 className="mx-0 md:mx-5 border-t border-neutral-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Giới thiệu về chúng tôi.
      </h1>

      <section className="px-5 md:px-20 mt-7 md:mt-14 flex flex-col gap-5">
        <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
          Chào mừng bạn đến với Chào mừng quý khách hàng đến với
          <span className="font-semibold ml-1">
            https://store.saigoncypher.vn
          </span>
          , điểm đến lý tưởng cho những chiếc áo thun boxy thời thượng, dành
          riêng cho giới trẻ yêu thích phong cách và sự tự do.
        </p>

        <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
          Chúng tôi đam mê tạo ra những chiếc áo thun chất lượng cao, đi đầu xu
          hướng thời trang, giúp bạn thể hiện cá tính một cách tự nhiên nhất. Dù
          bạn yêu thích phong cách tối giản hay nổi bật, chúng tôi đều có sự lựa
          chọn dành cho bạn.
        </p>

        <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
          Được làm bằng sự tỉ mỉ và thiết kế bền vững, áo thun của chúng tôi phù
          hợp với mọi dịp – từ những buổi gặp gỡ thân mật đến những chuyến phiêu
          lưu sáng tạo. Tham gia cộng đồng những bạn trẻ dẫn đầu xu hướng, coi
          trọng sự khác biệt và tính chân thực.
        </p>
      </section>
    </main>
  );
};

export default Contents;
