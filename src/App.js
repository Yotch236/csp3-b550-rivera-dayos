import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import AppNavbar from "./components/AppNavbar";
import Carousel from "./components/Carousel";
import Error from "./pages/ErrorPage";
import HeroSection from "./components/HeroSection";
import Trending from "./components/Trending";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginSuccess from "./pages/LoginSuccess";
import PublicRoutes from "./protectRoutes/PublicRoutes";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import FloatingCart from "./components/FloatingCart";
import ProductDetail from "./pages/ProductDetail";
import FullScreenLoader from "./pages/FullScreenLoader";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import UserContext from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  if (loading) return <FullScreenLoader />;
  return (
    <Router>
      <AppNavbar />
      <FloatingCart />
      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Trending />
              <Banner />
              <Footer />
            </>
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
