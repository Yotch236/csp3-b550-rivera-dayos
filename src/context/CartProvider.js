import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/cart/get-cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data[0];
      const rawCartItems = data?.cartItems || [];

      const detailedItems = await Promise.all(
        rawCartItems.map(async (item) => {
          try {
            const productRes = await axios.get(`http://localhost:4000/products/${item.productId}`);
            const product = productRes.data;

            return {
              productId: item.productId,
              quantity: item.quantity,
              name: product.name,
              price: product.price,
              image: product.image,
              subtotal: item.subtotal,
            };
          } catch (err) {
            console.error(`Failed to fetch product ${item.productId}`, err);
            return null;
          }
        })
      );

      const filteredItems = detailedItems.filter(Boolean);
      setCartItems(filteredItems);
      setItemCount(filteredItems.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, []); // ✅ No dependencies — won't recreate unless needed

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // ✅ Safe now — no infinite loops

  return (
    <CartContext.Provider value={{ itemCount, cartItems, fetchCart, setCartItems, setItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
