import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";

import AdminView from "../components/shop/AdminView";
import UserView from "../components/shop/UserView";
import UserContext from "../context/UserContext";

const Shop = () => {
  const { user } = useContext(UserContext);
  const [productList, setProductList] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const url = user?.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products/active`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const productsData = Array.isArray(res.data) ? res.data : res.data?.products || [];

      setProductList(productsData);
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  }, [user?.isAdmin]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {user.isAdmin ? (
        <AdminView products={productList} fetchProducts={fetchProducts} />
      ) : (
        <UserView products={productList} fetchProducts={fetchProducts} />
      )}
    </>
  );
};

export default Shop;
