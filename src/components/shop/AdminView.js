import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // <-- Import SweetAlert2
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BsPencil, BsTrash, BsArchive } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AddProductModal from "./AddProductModal";
import categories from "../../data/categories";

const AdminView = ({ products, fetchProducts }) => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(products);

  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = useCallback(() => {
    const reqBody = {};
    if (searchName.trim() !== "") reqBody.name = searchName.trim();
    if (minPrice > 0) reqBody.minPrice = minPrice;
    if (maxPrice > 0 && maxPrice !== minPrice) reqBody.maxPrice = maxPrice;

    if (status === `archived`) reqBody.isActive = false;
    else if (status === `active`) reqBody.isActive = true;
    else if (status === `outOfStock`) reqBody.stock = 0;
    else if (status === "trending") reqBody.sortByTotalSold = true;

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/products/search`, reqBody)
      .then((res) => {
        if (res.status === 200) setProductList(res.data);
      })
      .catch((error) => {
        console.log(`handleSearch Error`, error);
      });
  }, [searchName, minPrice, maxPrice, status]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchName.trim() || minPrice || maxPrice || status) {
        handleSearch();
      } else {
        fetchProducts();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchName, minPrice, maxPrice, status, handleSearch, fetchProducts]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleAddProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProductData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProductSave = async () => {
    setIsSaving(true);
    try {
      const formPayload = new FormData();
      Object.entries(newProductData).forEach(([key, val]) => {
        if (key === "image" && val) {
          formPayload.append("image", val);
        } else if (key !== "image") {
          formPayload.append(key, val);
        }
      });
      formPayload.append("isActive", true);

      const response = await axios.post("http://localhost:4000/products/", formPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        await fetchProducts();
        setShowAddModal(false);
        setNewProductData({
          name: "",
          price: "",
          stock: "",
          category: "",
          description: "",
          image: null,
        });
      } else {
        Swal.fire("Error", response.data.message || "Failed to add product", "error");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("Error", "An error occurred while saving the product. Check product if already exists", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:4000/products/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        await fetchProducts();
        Swal.fire("Deleted!", "Product deleted successfully.", "success");
      } else {
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error", "An error occurred while deleting the product.", "error");
    }
  };

  const handleStatus = async (product) => {
    const action = product.isActive ? "archive" : "activate";
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this product?`,
      text: product.isActive
        ? "This product will be archived and hidden from users."
        : "This product will be activated and visible to users.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: product.isActive ? "#ffc107" : "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Yes, ${action} it`,
    });

    if (!result.isConfirmed) return;

    try {
      const url = product.isActive
        ? `http://localhost:4000/products/${product._id}/archive`
        : `http://localhost:4000/products/${product._id}/activate`;

      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", response.data.message, "success");
        handleSearch();
      } else {
        Swal.fire("Error", "Failed to update product status.", "error");
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      Swal.fire("Error", "An error occurred while updating the product status.", "error");
    }
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <main>
      <Container className="products-container">
        <Row>
          <Col md={12}>
            {/* Title and Search Form */}
            <Row className="align-items-center justify-content-between mb-2">
              <Col xs={12} md>
                <Form className="bg-light p-2 rounded shadow-sm">
                  <Row className="align-items-center gy-3 gx-3 flex align-items-center justify-content-between ">
                    {/* Title */}
                    <Col xs={12} md="auto">
                      <h4 className="products-title mb-0">Products</h4>
                    </Col>

                    {/* Search Input */}
                    <Col xs={12} md="auto">
                      <Form.Group controlId="searchTerm" className="mb-0">
                        <Form.Control
                          type="text"
                          placeholder="Search products..."
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    {/* Min Price */}
                    <Col xs={6} md="auto">
                      <Form.Group controlId="minPrice" className="mb-0">
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Min Price"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    {/* Max Price */}
                    <Col xs={6} md="auto">
                      <Form.Group controlId="maxPrice" className="mb-0">
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    {/* Status Filter */}
                    <Col xs={12} md="auto">
                      <Form.Group controlId="statusFilter" className="mb-0">
                        <Form.Select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          aria-label="Filter status"
                        >
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="archived">Archived</option>
                          <option value="outOfStock">Out of Stock</option>
                          <option value="trending">Best Sellers</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Add Product Button */}
                    <Col xs="auto" className="text-end">
                      <Button variant="primary" onClick={() => setShowAddModal(true)}>
                        Add Product
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>

            {/* Product Cards Grid */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {productList.map((product, index) => {
                if (!product) return null;
                const { _id, name, image, price, stock, isActive, totalSold } = product;

                return (
                  <Col key={_id || index}>
                    <Card
                      className="product-card h-100 border-0"
                      onClick={() => navigate(`/product/${_id}`, { state: { openEditModal: true } })}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="product-image-wrapper position-relative">
                        <img
                          src={`http://localhost:4000${image}`}
                          alt={name}
                          className={`product-image w-100 ${stock === 0 ? "blur-image" : ""}`}
                        />
                        {stock === 0 && (
                          <div className="out-of-stock-overlay position-absolute top-50 start-50 translate-middle text-center text-danger fw-bold fs-5">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      <Card.Body className="product-body d-flex flex-column">
                        <Card.Title className="product-title">{name}</Card.Title>
                        <div className="product-price mb-1">₱{price}</div>
                        <div className="product-stock mb-2">Stock: {stock}</div>
                        <div className="product-total-sold mb-2">
                          Total Sold: <strong>{totalSold}</strong>
                        </div>
                        <div className={`${isActive ? "text-success" : "text-warning"} mb-2 fw-bold`}>
                          Status: {isActive ? "Active" : "Archived"}
                        </div>
                        <div className="d-flex gap-2 mt-auto">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${_id}`, { state: { openEditModal: true } });
                            }}
                          >
                            <BsPencil />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(_id);
                            }}
                          >
                            <BsTrash />
                          </Button>
                          <Button
                            variant={isActive ? "outline-warning" : "outline-success"}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatus(product);
                            }}
                          >
                            <BsArchive />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>

        {/* Add Product Modal */}
        <AddProductModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleChange={handleAddProductChange}
          handleSave={handleAddProductSave}
          formData={newProductData}
          categories={categories}
          isSaveDisabled={
            !newProductData.name.trim() ||
            !String(newProductData.price).trim() ||
            !String(newProductData.stock).trim() ||
            !newProductData.category.trim() ||
            isSaving
          }
          loading={isSaving}
        />
      </Container>
    </main>
  );
};

export default AdminView;
