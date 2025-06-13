import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import AddToCartBtn from "../AddToCartBtn";
import CartContext from "../../context/CartContext";

const UserView = ({ products, fetchProducts }) => {
  const navigate = useNavigate();
  const { cartItems, fetchCart } = useContext(CartContext);
  const [productList, setProductList] = useState(products);

  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  async function handleSearch() {
    const reqBody = {};
    if (searchName.trim()) reqBody.name = searchName.trim();
    if (minPrice > 0) reqBody.minPrice = minPrice;
    if (maxPrice > 0 && maxPrice !== minPrice) reqBody.maxPrice = maxPrice;
    if (status === "outOfStock") reqBody.stock = 0;
    if (status === "active") reqBody.isActive = true;
    if (status === "trending") reqBody.sortByTotalSold = true;

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/search`, reqBody);
      if (res.status === 200) setProductList(res.data);
    } catch (error) {
      console.log("User Search Error", error);
    }
  }

  useEffect(() => {
    if (searchName || minPrice || maxPrice || status) {
      handleSearch();
    } else {
      fetchProducts();
    }
  }, [searchName, minPrice, maxPrice, status]);

  return (
    <main>
      <Container className="products-container">
        <Row>
          <Col md={12}>
            {/* Title and Search Form */}
            <Row className="justify-content-center mb-2">
              <Col xs={12} md={10}>
                <Form className="bg-light p-3 rounded shadow-sm">
                  <Row className="align-items-center gy-3 gx-3">
                    {/* Title */}
                    <Col xs={12} md="auto">
                      <h1 className="products-title mb-0">Products</h1>
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
                      <Form.Group controlId="minPrice">
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
                      <Form.Group controlId="maxPrice">
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    {/* Status */}
                    <Col xs={12} md="auto">
                      <Form.Group controlId="statusFilter">
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="outOfStock">Out of Stock</option>
                          <option value="trending">Trending</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>

            {/* Product Grid */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {productList.map((product, index) => {
                if (!product) return null;
                console.log(`totalSOld`, product.totalSold);
                const { _id, name, image, price, stock, isActive, totalSold } = product;

                return (
                  <Col key={_id || index}>
                    <Card
                      className="product-card h-100 border-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/product/${_id}`)}
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
                          Total Sold: <strong>{product.totalSold}</strong>
                        </div>

                        <div className={`${isActive ? "text-success" : "text-warning"} mb-2 fw-bold`}>
                          Status: {isActive ? "Active" : "Archived"}
                        </div>
                        <AddToCartBtn productId={_id} stock={stock} cartItems={cartItems} refreshCart={fetchCart} />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default UserView;
