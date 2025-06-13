import React from "react";
import { Container, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <div className="hero-wrapper">
      <img src="" alt="Handcrafted wood and abaca" className="hero-image" />
      <Container className="hero-text-container">
        <h1 className="hero-title">Authentic Handmade Treasures</h1>
        <p className="hero-subtitle">
          Experience timeless craftsmanship with our curated collection of wooden and abaca products.
        </p>
        <Button className="hero-button" size="lg">
          🛍️ Buy Now
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;
