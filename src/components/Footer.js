// src/components/Footer.jsx
import React from "react";
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import logo from "../assets/logo.png";

const Footer = () => (
  <footer className="footer bg-woody-bg py-5">
    <Container className="px-4">
      <Row className="gy-4">
        {/* About */}
        <Col xs={12} md={4}>
          <h5 className="footer-title">
            <img src={logo} alt="Naty’s Handicraft Logo" height="40" className="d-inline-block align-middle" />
            <span className="mx-2">Naty’s Handicraft</span>
          </h5>
          <p className="footer-text">
            Handcrafted with love in every detail—bringing warm, natural artistry into your home.
          </p>
        </Col>

        {/* Quick Links */}
        <Col xs={6} md={2}>
          <h6 className="footer-subtitle">Quick Links</h6>
          <ul className="list-unstyled footer-links">
            <li>
              <a href="/products">Shop</a>
            </li>
            <li>
              <a href="/about">Our Story</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </Col>

        {/* Customer Service */}
        <Col xs={6} md={2}>
          <h6 className="footer-subtitle">Customer Service</h6>
          <ul className="list-unstyled footer-links">
            <li>
              <a href="/shipping">Shipping</a>
            </li>
            <li>
              <a href="/returns">Returns</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </Col>

        {/* Newsletter */}
        <Col xs={12} md={4}>
          <h6 className="footer-subtitle">Stay in the Loop</h6>
          <p className="footer-text">Sign up for our newsletter for updates and exclusive offers.</p>
          <Form className="d-flex">
            <InputGroup>
              <FormControl placeholder="Your email address" aria-label="Email" />
              <Button className="newsletter-btn" variant="">
                Subscribe
              </Button>
            </InputGroup>
          </Form>

          {/* Social Icons */}
          <div className="mt-3">
            <a href="#" className="social-icon me-3" aria-label="Facebook">
              {/* Replace with Font Awesome or lucide-react */}
              <svg width="24" height="24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
            <a href="#" className="social-icon me-3" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="4" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <svg width="24" height="24" fill="currentColor">
                <path d="M4 4h16v16H4z" />
              </svg>
            </a>
          </div>
        </Col>
      </Row>

      {/* Bottom legal */}
      <Row className="mt-5">
        <Col className="text-center">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} Naty’s Handicraft. All rights reserved.
          </small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
