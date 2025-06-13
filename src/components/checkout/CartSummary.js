// CartSummary.js
import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ step, onProceed }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (step === "payment") {
      // After order complete
      // You can clear cart, etc. here or in parent
      navigate("/cart/checkout/complete");
    } else {
      // Proceed to payment
      onProceed();
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Cart Summary</Card.Title>

        <Form.Group controlId="discountCode" className="mb-3">
          <Form.Label>Apply Discount Code</Form.Label>
          <Form.Control type="text" placeholder="Enter code" />
          <Button variant="outline-primary" className="mt-2 w-100">
            Apply
          </Button>
        </Form.Group>

        <hr />

        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal:</span>
          <strong>₱0.00</strong>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Discount:</span>
          <strong>-₱0.00</strong>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping Fee:</span>
          <strong>₱0.00</strong>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-3">
          <span>Total:</span>
          <strong>₱0.00</strong>
        </div>

        <Button variant="success" className="w-100" onClick={handleButtonClick}>
          {step === "shipping" ? "Proceed to Payment" : "Order Complete"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
