import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { MdClose } from "react-icons/md";

const SizeModal = () => {
  const { isSizeGuideModal, toggleIsSizeGuideModal } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = isSizeGuideModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSizeGuideModal]);

  return (
    <div
      onClick={() => toggleIsSizeGuideModal(false)}
      className={`z-20 ${
        isSizeGuideModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-300 bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-gray-300 md:mx-20"
      >
        <div className="flex justify-between items-start">
          <h4 className="lowercase text-2xl font-bold mt-8 md:mt-14 mx-3 md:mx-14">
            Hướng dẫn chọn cỡ.
          </h4>
          <button
            type="button"
            aria-label="Đóng mục hướng dẫn chọn cỡ"
            onClick={() => toggleIsSizeGuideModal(false)}
            className="m-2.5"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <table className="mt-5 border-collapse border border-gray-300 text-sm text-left mx-3 md:mx-14 mb-8 md:mb-14">
          <thead className="bg-gray-200">
            <tr className="md:hidden">
              <th className="border border-gray-300 px-4 py-2">Thông số</th>
              <td className="border border-gray-300 px-4 py-2">S</td>
              <td className="border border-gray-300 px-4 py-2">M</td>
              <td className="border border-gray-300 px-4 py-2">L</td>
              <td className="border border-gray-300 px-4 py-2">XL</td>
            </tr>
            <tr className="hidden md:table-row">
              <th className="border border-gray-300 px-4 py-2">Size</th>
              <th className="border border-gray-300 px-4 py-2">
                Vòng ngực (cm)
              </th>
              <th className="border border-gray-300 px-4 py-2">Vòng eo (cm)</th>
              <th className="border border-gray-300 px-4 py-2">
                Chiều dài áo (cm)
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Cân nặng (kg)
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Chiều cao (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="md:hidden">
              <td className="border border-gray-300 px-4 py-2">
                Vòng ngực (cm)
              </td>
              <td className="border border-gray-300 px-4 py-2">84-88</td>
              <td className="border border-gray-300 px-4 py-2">89-93</td>
              <td className="border border-gray-300 px-4 py-2">94-98</td>
              <td className="border border-gray-300 px-4 py-2">99-103</td>
            </tr>
            <tr className="md:hidden">
              <td className="border border-gray-300 px-4 py-2">Vòng eo (cm)</td>
              <td className="border border-gray-300 px-4 py-2">66-70</td>
              <td className="border border-gray-300 px-4 py-2">71-75</td>
              <td className="border border-gray-300 px-4 py-2">76-80</td>
              <td className="border border-gray-300 px-4 py-2">81-85</td>
            </tr>
            <tr className="md:hidden">
              <td className="border border-gray-300 px-4 py-2">
                Chiều dài áo (cm)
              </td>
              <td className="border border-gray-300 px-4 py-2">65</td>
              <td className="border border-gray-300 px-4 py-2">67</td>
              <td className="border border-gray-300 px-4 py-2">69</td>
              <td className="border border-gray-300 px-4 py-2">71</td>
            </tr>
            <tr className="md:hidden">
              <td className="border border-gray-300 px-4 py-2">
                Cân nặng (kg)
              </td>
              <td className="border border-gray-300 px-4 py-2">45-50</td>
              <td className="border border-gray-300 px-4 py-2">51-60</td>
              <td className="border border-gray-300 px-4 py-2">61-70</td>
              <td className="border border-gray-300 px-4 py-2">71-80</td>
            </tr>
            <tr className="md:hidden">
              <td className="border border-gray-300 px-4 py-2">
                Chiều cao (cm)
              </td>
              <td className="border border-gray-300 px-4 py-2">150-160</td>
              <td className="border border-gray-300 px-4 py-2">161-170</td>
              <td className="border border-gray-300 px-4 py-2">171-180</td>
              <td className="border border-gray-300 px-4 py-2">181-190</td>
            </tr>

            <tr className="hidden md:table-row">
              <td className="border border-gray-300 px-4 py-2">S</td>
              <td className="border border-gray-300 px-4 py-2">84-88</td>
              <td className="border border-gray-300 px-4 py-2">66-70</td>
              <td className="border border-gray-300 px-4 py-2">65</td>
              <td className="border border-gray-300 px-4 py-2">45-50</td>
              <td className="border border-gray-300 px-4 py-2">150-160</td>
            </tr>
            <tr className="hidden md:table-row">
              <td className="border border-gray-300 px-4 py-2">M</td>
              <td className="border border-gray-300 px-4 py-2">89-93</td>
              <td className="border border-gray-300 px-4 py-2">71-75</td>
              <td className="border border-gray-300 px-4 py-2">67</td>
              <td className="border border-gray-300 px-4 py-2">51-60</td>
              <td className="border border-gray-300 px-4 py-2">161-170</td>
            </tr>
            <tr className="hidden md:table-row">
              <td className="border border-gray-300 px-4 py-2">L</td>
              <td className="border border-gray-300 px-4 py-2">94-98</td>
              <td className="border border-gray-300 px-4 py-2">76-80</td>
              <td className="border border-gray-300 px-4 py-2">69</td>
              <td className="border border-gray-300 px-4 py-2">61-70</td>
              <td className="border border-gray-300 px-4 py-2">171-180</td>
            </tr>
            <tr className="hidden md:table-row">
              <td className="border border-gray-300 px-4 py-2">XL</td>
              <td className="border border-gray-300 px-4 py-2">99-103</td>
              <td className="border border-gray-300 px-4 py-2">81-85</td>
              <td className="border border-gray-300 px-4 py-2">71</td>
              <td className="border border-gray-300 px-4 py-2">71-80</td>
              <td className="border border-gray-300 px-4 py-2">181-190</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeModal;
