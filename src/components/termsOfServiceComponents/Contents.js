import React from "react";
import Breadcrumbs from "../Breadcrumbs";

const Contents = () => {
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Điều khoản dịch vụ", url: "" },
  ];
  return (
    <main>
      <div className="px-5 mt-32 md:mt-28">
        <Breadcrumbs namePages={namePages} />
      </div>
      <h1 className="mx-0 md:mx-5 border-t border-neutral-300 pt-5 md:pt-10 mt-3 md:mt-6 text-center lowercase text-2xl md:text-3xl">
        Điều khoản dịch vụ.
      </h1>

      <section className="px-5 md:px-20 mt-7 md:mt-14 flex flex-col gap-4">
        <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
          Chào mừng bạn đến với
          <span className="font-semibold ml-1">Saigon Cypher</span>. Khi sử dụng
          website và dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản
          dưới đây. Vui lòng đọc kỹ trước khi tiếp tục sử dụng.
        </p>

        <div>
          <h2 className="font-medium">1. Sử dụng dịch vụ</h2>
          <p className="mt-1 text-neutral-800 font-light leading-relaxed text-[15px]">
            Website của chúng tôi chỉ phục vụ mục đích mua sắm cá nhân. Bạn
            không được phép sử dụng website để thực hiện các hành vi vi phạm
            pháp luật hoặc gây tổn hại đến thương hiệu của chúng tôi.
          </p>
        </div>

        <div>
          <h2 className="font-medium">2. Thông tin khách hàng</h2>
          <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
            Bạn có trách nhiệm cung cấp thông tin chính xác khi đặt hàng. Chúng
            tôi cam kết bảo mật thông tin cá nhân của bạn theo chính sách bảo
            mật.
          </p>
        </div>

        <div>
          <h2 className="font-medium">3. Chính sách thanh toán</h2>
          <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
            Chúng tôi chấp nhận các hình thức thanh toán được liệt kê trên
            website. Mọi giao dịch không hợp lệ có thể bị hủy mà không cần thông
            báo trước.
          </p>
        </div>

        <div>
          <h2 className="font-medium">4. Chính sách đổi/trả hàng</h2>
          <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
            Chúng tôi có quyền từ chối đổi/trả nếu sản phẩm không đáp ứng yêu
            cầu khi không đáp ứng các điều kiện khả dụng.
          </p>
        </div>

        <div>
          <h2 className="font-medium">5. Quyền hạn của chúng tôi</h2>
          <p className="text-neutral-800 font-light leading-relaxed text-[15px]">
            Chúng tôi có quyền thay đổi, bổ sung hoặc ngừng cung cấp dịch vụ bất
            kỳ lúc nào mà không cần thông báo trước. Trong trường hợp phát hiện
            hành vi gian lận, tài khoản của bạn có thể bị khóa vĩnh viễn.
          </p>
        </div>
        <p className="mt-5 text-neutral-800 font-light leading-relaxed text-[15px]">
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Nếu có bất
          kỳ câu hỏi nào, vui lòng liên hệ với đội ngũ hỗ trợ qua email hoặc số
          hotline.
        </p>
      </section>
    </main>
  );
};

export default Contents;
