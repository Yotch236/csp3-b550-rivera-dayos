// ShippingDetailsForm.js
import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";

const ShippingDetailsForm = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Shipping Information</Card.Title>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="fullName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter full name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="mobileNumber" className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter mobile number" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="addressDropdown" className="mb-3">
            <Form.Label>Select Address (optional)</Form.Label>
            <Form.Select>
              <option>Select saved address</option>
              <option>Home</option>
              <option>Office</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="address1" className="mb-3">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control type="text" placeholder="Street, Building No." />
          </Form.Group>

          <Form.Group controlId="address2" className="mb-3">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control type="text" placeholder="Apartment, Suite, etc." />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="barangay" className="mb-3">
                <Form.Label>Barangay</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="city" className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="province" className="mb-3">
                <Form.Label>Province</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="regionState" className="mb-3">
                <Form.Label>Region/State</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="zipCode" className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="country" className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="landmark" className="mb-3">
            <Form.Label>Landmark</Form.Label>
            <Form.Control type="text" placeholder="e.g. Near church, across mall" />
          </Form.Group>

          <Form.Group controlId="shippingNotes" className="mb-3">
            <Form.Label>Shipping Notes</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Any special delivery notes..." />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ShippingDetailsForm;
