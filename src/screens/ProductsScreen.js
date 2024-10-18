import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import Contents from "./../components/productsComponents/Contents";
import { Helmet } from "react-helmet";

const ProductsScreen = () => {
  return (
    <div>
      <Helmet>
        <title>Saigoncypher - Tất cả sản phẩm</title>
      </Helmet>

      <Header />
      <Contents />
      <Footer />
    </div>
  );
};

export default ProductsScreen;
