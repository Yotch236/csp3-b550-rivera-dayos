import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import countries from "../../data/countries";

const AddressModal = ({ show, onHide, address, onChange, onSave, isEdit }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit Address" : "Add Address"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {[
            ["Label", "label"],
            ["Address Line 1", "addressLine1"],
            ["Address Line 2", "addressLine2"],
            ["City", "city"],
            ["State/Region", "stateRegion"],
            ["Postal Code", "zipCode"],
          ].map(([label, name]) => (
            <Form.Group className="mb-3" key={name}>
              <Form.Label>{label}</Form.Label>
              <Form.Control name={name} value={address[name]} onChange={onChange} />
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select name="country" value={address.country} onChange={onChange}>
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressModal;
