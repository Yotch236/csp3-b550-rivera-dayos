import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Image, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const Cart = () => {
  const { cartItems, fetchCart, setCartItems, setItemCount } = useContext(CartContext);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      await fetchCart();
      setLoading(false);
    };
    console.log("Token:", localStorage.getItem("token"));
    loadCart();
  }, [fetchCart]);

  // Sync local cart with context
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const getTotal = () => localCartItems.reduce((total, item) => total + (item.subtotal ?? 0), 0);

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;

    // Optimistic update
    setLocalCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQty,
              subtotal: newQty * (item.price ?? 0),
            }
          : item
      )
    );

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/update-item-quantity`,
        { productId, quantity: newQty },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // fetchCart removed for smoother UX
    } catch (err) {
      console.error("Failed to update quantity:", err);
      await fetchCart(); // fallback if error occurs
    }
  };

  const handleRemove = async (productId) => {
    // Optimistic update
    setLocalCartItems((prev) => prev.filter((item) => item.productId !== productId));

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // fetchCart removed for smoother UX
    } catch (err) {
      console.error("Failed to remove item:", err);
      await fetchCart(); // fallback if error occurs
    }
  };

  const clearCart = async () => {
    try {
      await axios.patch(
        "${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Optimistically clear local and global cart
      setLocalCartItems([]);
      setCartItems([]);
      setItemCount(0);

      Swal.fire({
        title: "Cart Cleared",
        text: "Your cart has been emptied successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to clear cart:", error?.response?.data || error.message);

      Swal.fire({
        title: "Failed to Clear Cart",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "${process.env.REACT_APP_API_BASE_URL}/orders/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const order = res.data;
      console.log("Token:", localStorage.getItem("token"));

      // Show success alert with order ID
      Swal.fire({
        title: "Order Placed Successfully!",
        text: `Your order Id: ${order._id}`,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate(`/orders`, {});
      setCartItems([]);
      setItemCount(0);
      console.log(`fetchCart`, fetchCart());
    } catch (error) {
      console.log("placeOrder error", error?.response?.data || error.message);

      Swal.fire({
        title: "Order Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" style={{ width: "4rem", height: "4rem" }} />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Your Cart</h2>
            <Button variant="outline-primary" onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          </div>

          {localCartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty.</Alert>
          ) : (
            localCartItems.map((item) => (
              <Card key={item.productId} className="mb-3 shadow-sm">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                      <Image
                        src={`${process.env.REACT_APP_API_BASE_URL}${item.image}`}
                        fluid
                        rounded
                        style={{
                          maxHeight: "100px",
                          objectFit: "contain",
                        }}
                      />
                    </Col>
                    <Col xs={12} md={3} className="mb-2 mb-md-0">
                      <h5>{item.name}</h5>
                      <div className="text-muted">₱{(item.price ?? 0).toLocaleString()}</div>
                    </Col>
                    <Col xs={12} md={3}>
                      <div className="d-flex align-items-center justify-content-md-start justify-content-center">
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </Button>
                        <Form.Control
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="mx-2 text-center"
                          style={{ width: "60px" }}
                        />
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={2} className="text-md-end text-center mt-3 mt-md-0">
                      <strong>₱{(item.subtotal ?? 0).toLocaleString()}</strong>
                    </Col>
                    <Col xs={6} md={2} className="text-md-end text-center mt-3 mt-md-0">
                      <Button variant="outline-danger" size="sm" onClick={() => handleRemove(item.productId)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

        <Col md={4} className="position-sticky" style={{ top: "80px" }}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-4">Cart Summary</h4>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>₱{getTotal().toLocaleString()}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <strong>₱0.00</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <h5>₱{getTotal().toLocaleString()}</h5>
              </div>

              <Button variant="success" className="w-100" onClick={placeOrder} disabled={localCartItems.length === 0}>
                Place Order
              </Button>
              <Button
                variant="outline-danger"
                className="w-100 mt-2"
                onClick={clearCart}
                disabled={localCartItems.length === 0}
              >
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
