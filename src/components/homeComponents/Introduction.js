import React from "react";
import { MdFormatQuote } from "react-icons/md";

const Introduction = () => {
  return (
    <div className="px-10 lg:px-20 py-20 lg:py-28">
      <p className="text-lg italic relative first-letter:ml-12">
        Chúng tôi cam kết mang đến những sản phẩm áo thun mềm mại, thoáng khí và
        cực kỳ bền bỉ, cho bạn cảm giác dễ chịu cả ngày dài. Dù bạn là tín đồ
        của sự đơn giản hay yêu thích các họa tiết nổi bật, chúng tôi có đủ mẫu
        mã để bạn thoải mái lựa chọn. Các áo thun boxy giúp bạn tạo ra những bộ
        outfit vừa thoải mái lại vừa thời thượng.
        <span className="absolute top-[-24px] left-[-8px]">
          <MdFormatQuote className="text-6xl text-neutral-800" />
        </span>
      </p>
    </div>
  );
};

export default Introduction;
