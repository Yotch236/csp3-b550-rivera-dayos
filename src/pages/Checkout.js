// CheckoutPage.js
import React, { useState } from "react";
import { Col, Row, Container, ProgressBar } from "react-bootstrap";
import ShippingDetailsForm from "../components/checkout/ShippingDetailsForm";
import PaymentDetailsForm from "../components/checkout/PaymentDetailsForm";
import CartSummary from "../components/checkout/CartSummary";

const steps = ["Shipping", "Payment", "Order Complete"];

const Checkout = () => {
  const [step, setStep] = useState("shipping");

  const stepIndex = steps.findIndex((s) => s.toLowerCase().replace(/\s+/g, "") === step);

  // ProgressBar segments: each step gets ~33.3%
  const progressValues = [33, 33, 34];

  // Build segments with active/completed colors
  const segments = progressValues.map((value, index) => ({
    now: value,
    variant:
      index < stepIndex
        ? "success" // completed steps in green
        : index === stepIndex
        ? "info" // current step in blue
        : "light", // pending steps light gray
  }));

  console.log(`segments`, segments);

  const handleNextStep = () => {
    if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("ordercomplete");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={8}>
          {/* Enhanced Progress Bar */}
          <ProgressBar>
            {segments.map((segment, i) => (
              <ProgressBar
                key={i}
                now={segment.now}
                variant={segment.variant}
                label={steps[i]}
                visuallyHidden={false}
              />
            ))}
          </ProgressBar>

          {/* Step Titles */}
          <Row className="text-center mt-2 mx-1">
            {steps.map((label, i) => (
              <Col key={i} className={`${i === stepIndex ? "fw-bold text-primary" : "text-muted"}`}>
                {label}
              </Col>
            ))}
          </Row>

          {/* Show forms conditionally */}
          {step === "shipping" && <ShippingDetailsForm />}
          {step === "payment" && <PaymentDetailsForm />}
          {/* For order complete step you can add something else or redirect */}
        </Col>

        <Col md={4}>
          <CartSummary step={step} onProceed={handleNextStep} />
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
