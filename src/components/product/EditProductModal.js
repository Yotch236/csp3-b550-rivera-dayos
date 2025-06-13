import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import categories from "../../data/categories";

const EditProductModal = ({ show, onHide, onSave, product }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    isActive: true,
    stock: 0,
    image: null,
    previewImage: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name || "",
        price: product.price || 0,
        isActive: product.isActive !== false,
        stock: product.stock || 0,
        image: null,
        previewImage: product.image ? `http://localhost:4000${product.image}` : "",
        category: product.category || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setEditedProduct((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      setEditedProduct((prev) => ({
        ...prev,
        image: file,
        previewImage: file ? URL.createObjectURL(file) : prev.previewImage,
      }));
    } else {
      setEditedProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!product || !product._id) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("price", editedProduct.price);
      formData.append("isActive", editedProduct.isActive);
      formData.append("stock", editedProduct.stock);
      formData.append("category", editedProduct.category);
      if (editedProduct.image) {
        formData.append("image", editedProduct.image);
      }

      const res = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/products/${product._id}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      onSave(res.data); // Notify parent
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Asterisk = () => <span className="text-danger">*</span>;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className="top-navbar">
        <Modal.Title className="footer-title">Edit Product</Modal.Title>
      </Modal.Header>

      <Modal.Body className="top-navbar">
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              Product Name <Asterisk />
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedProduct.name}
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
                  value={editedProduct.price}
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
                  value={editedProduct.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  step="1"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Category Select */}
          <Form.Group className="mb-3">
            <Form.Label className="footer-title">
              Category <Asterisk />
            </Form.Label>
            <Form.Select name="category" value={editedProduct.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
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
            <Form.Label className="footer-title">Status</Form.Label>
            <Form.Check
              type="switch"
              name="isActive"
              checked={editedProduct.isActive}
              onChange={handleChange}
              label={editedProduct.isActive ? "Active" : "Archived"}
            />
          </Form.Group>

          {editedProduct.previewImage && (
            <div className="mb-3">
              <Image src={editedProduct.previewImage} alt="Preview" thumbnail className="w-100" />
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="footer-title">Product Image</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="top-navbar">
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button className="woody-toggle-btn" onClick={handleSubmit} disabled={loading}>
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

export default EditProductModal;
