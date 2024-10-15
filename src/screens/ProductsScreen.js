import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import Contents from "./../components/productsComponents/Contents";
import Breadcrumbs from "../components/Breadcrumbs";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";

const ProductsScreen = () => {
  const { keyword } = useParams();
  const namePages = [
    { name: "Trang chủ", url: "/" },
    { name: "Tất cả sản phẩm", url: "/products" },
  ];

  const updatedPages = useMemo(() => {
    if (keyword) {
      return [...namePages, { name: `${keyword}`, url: "" }];
    }
    return namePages;
  }, [keyword]);

  return (
    <div>
      <Helmet>
        <title>Saigoncypher - Tất cả sản phẩm</title>
        <meta
          name="description"
          content="Saigoncypher - Cửa hàng áo thun thời trang với phong cách đơn giản."
        />
        <meta
          name="keywords"
          content="áo thun, thời trang, saigon, sài gòn, simple, đơn giản, saigoncypher"
        />
      </Helmet>

      <Header />
      <Breadcrumbs namePages={updatedPages} />
      <Contents />
      <Footer />
    </div>
  );
};

export default ProductsScreen;
