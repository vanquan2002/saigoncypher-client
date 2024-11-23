import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProductScreen from "./screens/SingleProductScreen";
import LogIn from "./screens/LogIn";
import Register from "./screens/Register";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import ProductsScreen from "./screens/ProductsScreen";
import AboutUs from "./screens/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/products/page/:pageNumber" element={<ProductsScreen />} />
        <Route path="/products/search/:keyword" element={<ProductsScreen />} />
        <Route
          path="/products/search/:keyword/page/:pageNumber"
          element={<ProductsScreen />}
        />
        <Route path="/product/:slug" element={<SingleProductScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route
          path="/shipping"
          element={<PrivateRouter navig="shipping" comp={<ShippingScreen />} />}
        />
        <Route
          path="/placeorder"
          element={
            <PrivateRouter navig="placeorder" comp={<PlaceOrderScreen />} />
          }
        />
        <Route
          path="/profile"
          element={<PrivateRouter navig="profile" comp={<ProfileScreen />} />}
        />
        <Route
          path="/order/:id"
          element={<PrivateRouter navig="order" comp={<OrderScreen />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
