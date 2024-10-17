import React, { useRef } from "react";
import Fancybox from "./Fancybox ";
import { Link } from "react-router-dom";

const ImageList = ({ images }) => {
  const containerRef = useRef(null);
  const imgsRefs = useRef([]);

  const wheelImgsWhenClickHandle = (index) => {
    const targetElement = imgsRefs.current[index];
    if (targetElement) {
      const containerTop = containerRef.current.offsetTop;
      const targetTop = targetElement.offsetTop;
      const offset = targetTop - containerTop;
      containerRef.current.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <Fancybox
        options={{
          Carousel: {
            infinite: true,
          },
          Thumbs: {
            showOnStart: false,
          },
          Toolbar: {
            display: {
              left: ["infobar"],
              middle: [],
              right: ["zoomIn", "zoomOut", "close"],
            },
          },
          contentClick: "toggleMax",
          Images: {
            Panzoom: {
              maxScale: 2,
              panMode: "mousemove",
              mouseMoveFactor: 1.1,
              mouseMoveFriction: 0.12,
            },
          },
        }}
      >
        <ul ref={containerRef} className="h-[550px] overflow-hidden">
          {images?.map((item, i) => (
            <li key={i}>
              <Link
                aria-label={`Đi đến hình ảnh ${item.description}`}
                data-fancybox="gallery"
                className="flex flex-col"
                to={item.image}
                ref={(element) => (imgsRefs.current[i] = element)}
              >
                <img
                  src={item.image}
                  className="object-cover w-full h-[550px]"
                  alt={`Hình ảnh của ${item.description}`}
                  title={item.description}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Fancybox>

      <ul className="absolute bottom-0 right-0 w-9 flex gap-1 flex-col justify-end mr-3 mb-3">
        {images?.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              aria-label={`Nút nhấn để hiển thị hình ảnh ${item.description}`}
              className="flex justify-center items-center "
              onClick={() => wheelImgsWhenClickHandle(i)}
            >
              <img
                src={item.image}
                className="w-full shadow-sm"
                alt={`Hình ảnh của ${item.description}`}
                title={`Hiển thị hình ảnh ${item.description}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
