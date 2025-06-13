import React from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";

const AddProductModal = ({
  show,
  handleClose,
  handleChange,
  handleSave,
  formData,
  categories,
  isSaveDisabled,
  loading,
}) => {
  const Asterisk = () => <span className="text-danger">*</span>;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="top-navbar">
        <Modal.Title className="footer-title">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className="top-navbar">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              Product Name <Asterisk />
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="footer-title">
                  Price <Asterisk />
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="footer-title">
                  Stock <Asterisk />
                </Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  step="1"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              Category <Asterisk />
            </Form.Label>
            <Form.Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map(({ group, items }) =>
                items.map((item, idx) => (
                  <option key={`${group}-${idx}`} value={item}>
                    {item}
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">Product Image</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
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
              Saving Product...
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
