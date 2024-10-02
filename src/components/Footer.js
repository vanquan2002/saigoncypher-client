import React from "react";

const Footer = () => {
  return (
    <div className="p-5 md:p-20 mt-72 flex flex-col gap-20">
      <div className="flex gap-8 uppercase">
        <p className="text-xs font-medium hover:underline cursor-pointer">
          Facebook
        </p>
        <p className="text-xs font-medium hover:underline cursor-pointer">
          Tiktok
        </p>
        <p className="text-xs font-medium hover:underline cursor-pointer">
          Threads
        </p>
      </div>

      <div className="uppercase">
        <p className="text-sm font-medium">Hotline</p>
        <p className="text-4xl md:text-5xl mt-2 font-semibold">0905260448</p>
        <p className="text-[11px] mt-2">
          Online Từ Thứ 2 đến Chúa Nhật, Từ 9am đến 6pm
        </p>
        <div>
          <span className="text-[11px]">Email: </span>
          <span className="text-[11px] hover:underline cursor-pointer">
            SUPPORT@SAIGONCYPHER.COM
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-20 uppercase">
        <div>
          <p className="text-sm font-semibold">Trợ giúp</p>
          <div className="mt-2">
            <p className="text-xs mt-1 hover:underline cursor-pointer">
              Tài khoản của tôi
            </p>
            <p className="text-xs mt-1 hover:underline cursor-pointer">
              Đổi, trả hàng và hoàn tiền
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Chính sách</p>
          <div className="mt-2">
            <p className="text-xs mt-1 hover:underline cursor-pointer">
              Chính sách bảo mật thông tin
            </p>
            <p className="text-xs mt-1 hover:underline cursor-pointer">
              Chính sách vận chuyển, giao hàng
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Hộ kinh doanh</p>
          <div className="mt-2">
            <p className="text-xs mt-1 hover:underline cursor-pointer">
              Giới thiệu về chúng tôi
            </p>
            <p className="text-xs mt-1 hover:underline cursor-pointer">
              Đóng góp ý tưởng - ý kiến
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
