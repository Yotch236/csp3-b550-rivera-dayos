import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BannerImg from "../assets/banner/banner.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const goToShop = () => {
    navigate("/products");
  };
  

  return (
    <section className="px-4 my-5">
      <Container>
        <Row className="align-items-center">
          {/* Image Column */}
          <Col xs={12} md={6} className="d-flex justify-content-center mb-4 mb-md-0">
            <img
              src={BannerImg}
              alt="Handcrafted collection"
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </Col>
          {/* Text Column */}
          <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
            <h2 className="banner-title">Discover Our Latest Collection</h2>
            <p className="banner-text">Elevate your home with handcrafted, one-of-a-kind treasures.</p>
            <Button className="woody-toggle-btn" onClick={goToShop}>
              Shop Now
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
