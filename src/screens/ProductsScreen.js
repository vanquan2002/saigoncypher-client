import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import Contents from "./../components/productsComponents/Contents";
import { Helmet } from "react-helmet";

const ProductsScreen = () => {
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
      <Contents />
      <Footer />
    </div>
  );
};

export default ProductsScreen;
