import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";

const FloatingCart = () => {
  const { user } = useContext(UserContext);
  const { itemCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the floating cart on the /cart page
  if (location.pathname === "/cart") {
    return null;
  }

  const openCart = () => {
    if (user?.isAdmin) {
      navigate("/orders");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="floating-cart" onClick={openCart}>
      <span className="cart-icon" aria-label="cart" role="img">
        🛒
      </span>
      {itemCount > 0 && <span className="item-count">{itemCount}</span>}
    </div>
  );
};

export default FloatingCart;
