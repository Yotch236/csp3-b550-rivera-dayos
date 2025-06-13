// OrderComplete.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderComplete = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-4">
      <Row>
        <Col md={12} className="text-center mb-4">
          <h2>ORDER COMPLETED</h2>
          <h4>THANK YOU</h4>
          <p className="lead">YOUR ORDER HAS BEEN RECEIVED</p>
          <p>For any concern, please feel free to Contact Us.</p>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Order Number: #ORDERID</Card.Title>
              <hr />
              {/* Example product item layout */}
              <div className="d-flex align-items-center mb-3">
                <img src="/placeholder.jpg" alt="Product" width={60} className="me-3" />
                <div>
                  <h6 className="mb-0">Product Name</h6>
                  <small>Quantity: 1</small>
                </div>
                <div className="ms-auto">
                  <strong>₱0.00</strong>
                </div>
              </div>

              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <strong>₱0.00</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Discount:</span>
                <strong>-₱0.00</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping Fee:</span>
                <strong>₱0.00</strong>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Total:</span>
                <strong>₱0.00</strong>
              </div>
            </Card.Body>
          </Card>

          <Button variant="primary" onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Delivery</Card.Title>
              <p>Date: -</p>
              <p>Mobile Number: -</p>
              <p>Payment Method: -</p>
              <p>Total: ₱0.00</p>
              <hr />
              <p>
                <strong>Shipping Details:</strong>
              </p>
              <p>[Full address shown here]</p>
              <hr />
              <p>
                <strong>Estimated Delivery:</strong>
              </p>
              <p>[Default message here]</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderComplete;
