import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartContext from "../context/CartContext";
import AddToCartBtn from "../components/AddToCartBtn"; // Make sure path is correct
import UserContext from "../context/UserContext";

const Trending = () => {
  const { user } = useContext(UserContext);
  const { cartItems, fetchCart } = useContext(CartContext);

  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    const url = user.isAdmin
      ? "${process.env.REACT_APP_API_BASE_URL}/products/trending"
      : "${process.env.REACT_APP_API_BASE_URL}/products/active/trending";
    try {
      const res = await axios.get(`${url}`);
      setTrending(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="px-4 my-5">
      <header className="trending-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white" style={{ color: "var(--woody-dark)" }}>
          Trending Items
        </h2>
        <Button as={Link} to="/products" className="view-more-btn" variant="" aria-label="View more trending items">
          View More
        </Button>
      </header>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {trending.map((product, index) => {
          if (!product) return null;
          const { _id, name, image, price, stock, isActive } = product;

          return (
            <Col key={_id}>
              <Card
                className="product-card h-100 border-0"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${_id}`)}
              >
                <div className="product-image-wrapper position-relative">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${image}`}
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
    </Container>
  );
};

export default Trending;
