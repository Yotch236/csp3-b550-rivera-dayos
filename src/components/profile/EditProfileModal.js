// components/profile/EditProfileModal.js
import React from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";

const EditProfileModal = ({
  show,
  handleClose,
  handleChange,
  handleSave,
  formData,
  selectedCountry,
  mobileValid,
  getValidationState,
  isSaveDisabled,
  loading,
}) => {
  const Asterisk = () => <span className="text-danger">*</span>;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="top-navbar">
        <Modal.Title className="footer-title">Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="top-navbar">
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="footer-title">
                  First Name <Asterisk />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  {...getValidationState("firstName")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="footer-title">
                  Last Name <Asterisk />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  {...getValidationState("lastName")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              Email <Asterisk />
            </Form.Label>
            <Form.Control type="email" name="email" value={formData.email} disabled readOnly />
            <Form.Control.Feedback type="invalid" className="text-danger text-center">
              Please enter a valid email address with '@' and '.com'.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              Country <Asterisk />
            </Form.Label>
            <Form.Select
              name="country"
              value={formData.country}
              onChange={handleChange}
              {...getValidationState("country")}
            >
              <option value="">Select Country</option>
              {selectedCountry.allCountries?.map(({ name, code, dialCode }) => (
                <option key={code} value={code}>
                  {name} ({dialCode})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              Mobile Number <Asterisk />
            </Form.Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  padding: "0.375rem 0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem 0 0 0.25rem",
                  backgroundColor: "#e9ecef",
                  userSelect: "none",
                }}
              >
                {selectedCountry.dialCode}
              </span>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder={`Enter ${selectedCountry.localNumberLength} digit number`}
                isInvalid={mobileValid === false}
                isValid={mobileValid === true}
                style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
              />
            </div>
            <Form.Control.Feedback
              type="invalid"
              className="text-center"
              style={{ display: mobileValid === false ? "block" : "none" }}
            >
              Must be exactly {selectedCountry.localNumberLength} digits.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">Address Line 1</Form.Label>
            <Form.Control type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">Address Line 2</Form.Label>
            <Form.Control type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="footer-title">
                  City <Asterisk />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  {...getValidationState("city")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="footer-title">
                  Zip Code <Asterisk />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  {...getValidationState("zipCode")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              State/Region <Asterisk />
            </Form.Label>
            <Form.Control
              type="text"
              name="stateRegion"
              value={formData.stateRegion}
              onChange={handleChange}
              {...getValidationState("stateRegion")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="top-navbar">
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button className="woody-toggle-btn" onClick={handleSave} disabled={isSaveDisabled}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
              Saving Changes...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
