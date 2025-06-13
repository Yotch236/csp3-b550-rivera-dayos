// PaymentDetailsForm.js
import React from "react";
import { Card, Form } from "react-bootstrap";

const PaymentDetailsForm = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Payment Method</Card.Title>
        <Form>
          <Form.Check type="radio" label="Cash on Delivery" name="paymentMethod" id="cod" className="mb-2" />
          <Form.Check type="radio" label="E-Wallet" name="paymentMethod" id="ewallet" className="mb-2" />

          <div className="ps-3">
            <Form.Check type="radio" label="GCash" name="eWalletType" id="gcash" className="mb-2" />
            <Form.Check type="radio" label="Card" name="eWalletType" id="card" className="mb-2" />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PaymentDetailsForm;
