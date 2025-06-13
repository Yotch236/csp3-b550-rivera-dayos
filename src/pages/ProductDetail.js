import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronsLeft, Edit } from "lucide-react";
import { Container, Row, Col, Badge, Button, Spinner, Alert } from "react-bootstrap";
import EditProductModal from "../components/product/EditProductModal";
import UserContext from "../context/UserContext";
import AddToCartBtn from "../components/AddToCartBtn";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // get user from context

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showImagePopup, setShowImagePopup] = useState(false);
  // Fetch product data
  console.log(product);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`);
        console.log(`product`, response.data);
        setProduct(response.data);
        setError(null);
      } catch {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!user?.isAdmin && (e.key === "Escape" || e.key === "Backspace")) {
        navigate(-1); // Navigate back
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user, navigate]);

  const handleSave = (updatedProduct) => {
    setProduct(updatedProduct);
    setShowEditModal(false);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center" style={{ backgroundColor: "var(--woody-bg)", minHeight: "70vh" }}>
        <Spinner animation="border" role="status" variant="warning" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5" style={{ backgroundColor: "var(--woody-bg)", minHeight: "70vh" }}>
        <Alert variant="warning">{error}</Alert>
      </Container>
    );
  }

  if (!product) return null;

  return (
    <>
      <EditProductModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={product}
        onSave={handleSave}
      />

      <Container className="py-5 position-relative container-pd mt-4">
        <Button
          onClick={() => navigate("/products")}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
            border: "none",
            backgroundColor: "transparent",
            color: "#6f6350",
            padding: 0,
            lineHeight: 1,
          }}
          title="Close"
          aria-label="Close"
        >
          <ChevronsLeft />
          Back
        </Button>

        <Row className="gy-4">
          <Col md={6}>
            <div
              className="product-details-wrapper"
              style={{
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                padding: "1rem",
                cursor: "pointer",
              }}
              onClick={() => setShowImagePopup(true)}
            >
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.name}
                className="img-fluid"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            </div>
          </Col>

          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1
              style={{
                fontSize: "2.2rem",
                marginBottom: "0.7rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {product.name}
              {product.totalSold !== undefined && (
                <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--woody-secondary)" }}>
                  (Total Sold: <strong>{product.totalSold}</strong>)
                </span>
              )}
            </h1>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: 600 }}>
              Category: {product.category}
            </h2>
            <p
              style={{
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "var(--woody-accent)",
                fontWeight: 600,
              }}
            >
              ₱{product.price.toFixed(2)}
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.6,
                color: "#5c4a35",
                marginBottom: "1.5rem",
              }}
            >
              {product.description}
            </p>

            <div className="mb-3">
              <Badge
                bg={product.isActive ? "success" : "warning"}
                style={{
                  backgroundColor: product.isActive ? "var(--woody-accent)" : "var(--woody-secondary)",
                  color: product.isActive ? "white" : "var(--woody-bg)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  padding: "0.4em 0.9em",
                  borderRadius: "50px",
                }}
              >
                {product.isActive ? "Active" : "Archived"}
              </Badge>
            </div>

            <div
              className="mb-4"
              style={{
                fontWeight: 500,
                color: product.stock > 0 ? "#3b311e" : "#aa0000",
                fontSize: "1rem",
              }}
            >
              {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
            </div>

            {/* Show Add to Cart only if user is NOT admin */}
            {!user?.isAdmin && (
              <>
                <div className="mb-3 d-flex align-items-center gap-3">
                  <span style={{ fontWeight: 600 }}>Quantity:</span>
                  <div
                    className="d-flex align-items-center border rounded px-2"
                    style={{ width: "120px", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="light"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      style={{ padding: "0.2rem 0.6rem", fontSize: "1.2rem" }}
                    >
                      -
                    </Button>
                    <span style={{ fontWeight: 600 }}>{quantity}</span>
                    <Button
                      variant="light"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      style={{ padding: "0.2rem 0.6rem", fontSize: "1.2rem" }}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <AddToCartBtn productId={product._id} quantity={quantity} />
              </>
            )}

            {user?.isAdmin && (
              <Button
                variant="outline-secondary"
                onClick={() => setShowEditModal(true)}
                style={{
                  borderRadius: 10,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "fit-content",
                  color: "var(--woody-accent)",
                  borderColor: "var(--woody-accent)",
                }}
                aria-label="Edit product"
                title="Edit Product"
              >
                <Edit size={18} />
                Edit
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      {showImagePopup && (
        <div
          onClick={() => setShowImagePopup(false)}
          className="image-popup-overlay"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <img src={`http://localhost:4000${product.image}`} alt={product.name} />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
