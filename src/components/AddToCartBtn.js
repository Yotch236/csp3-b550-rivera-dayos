import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";

const AddToCartBtn = ({ productId, stock, quantity = 1, cartItems, refreshCart }) => {
  const { fetchCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // ✅ Get user context
  const [loading, setLoading] = useState(false);

  const isAdded = cartItems?.some((item) => {
    const id = typeof item.productId === "object" ? item.productId._id : item.productId;
    return id === productId;
  });

  const handleAddToCart = async () => {
    if (!user?.id) {
      // ✅ Show alert if not logged in
      Swal.fire({
        title: "Login Required",
        text: "Please log in first to add items to your cart.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login"; // or use navigate if using React Router
        }
      });
      return;
    }

    console.log(`[AddToCartBtn] Adding productId ${productId} with quantity ${quantity} to cart...`);
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`,
        { productId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(`[AddToCartBtn] Add to cart response:`, response.data);
      fetchCart();
      if (refreshCart) {
        console.log("[AddToCartBtn] Refreshing cart...");
        await refreshCart();
        console.log("[AddToCartBtn] Cart refreshed.");
      }
    } catch (err) {
      console.error("[AddToCartBtn] Failed to add to cart:", err);
      Swal.fire({
        icon: "error",
        title: "Quantity Exceeded",
        text: "The order quantity exceeds the available stock. Please check your cart.",
      });
    } finally {
      setLoading(false);
      console.log("[AddToCartBtn] Loading finished.");
    }
  };

  const isDisabled = stock === 0 || isAdded || loading;

  return (
    <Button
      className="woody-toggle-btn mt-auto"
      disabled={isDisabled}
      onClick={(e) => {
        e.stopPropagation();
        if (!isDisabled) handleAddToCart();
      }}
    >
      {loading ? "ADDING..." : isAdded ? "ADDED TO CART" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartBtn;
