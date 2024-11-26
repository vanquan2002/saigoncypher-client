const Marquees = () => {
  const contentText =
    "SaigonCypher - Chúng tôi mang đến những chiếc áo thun form boxy cực kỳ thoải mái, phù hợp cho những bạn trẻ năng động và yêu thích sự tự do trong phong cách thời trang. Với thiết kế hiện đại, đơn giản nhưng đầy cá tính, các mẫu áo thun của chúng tôi dễ dàng kết hợp với nhiều kiểu trang phục khác nhau, từ các buổi hẹn hò, dạo phố đến những chuyến đi xa.";

  return (
    <div className="border-y border-neutral-600 relative flex overflow-x-hidden">
      <div className="animate-marquee">
        <span className="text-sm leading-6 mx-8 whitespace-nowrap">
          {contentText}
        </span>
      </div>

      <div className="absolute top-0 animate-marquee2 ">
        <span className="text-sm leading-6 mx-8 whitespace-nowrap">
          {contentText}
        </span>
      </div>
    </div>
  );
};

export default Marquees;
