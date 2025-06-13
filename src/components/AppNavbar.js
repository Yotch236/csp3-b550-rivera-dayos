import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import UserContext from "../context/UserContext";
import { FaExclamationCircle } from "react-icons/fa";

const AppNavbar = () => {
  const { user, unsetUser } = useContext(UserContext);
  console.log(`user in appnavbar.js`, user);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage, unset user in context, and redirect to login page
    localStorage.removeItem("token");
    unsetUser();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="top-navbar shadow-sm py-1">
      <Container className="px-4">
        {/* Logo and Brand */}
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2 brand-logo">
          <img src={logo} alt="Naty’s Handicraft Logo" height="40" className="d-inline-block align-middle" />
          <span className="fw-bold fs-4">Naty’s Handicraft</span>
        </Navbar.Brand>

        {/* Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbar-top" />

        <Navbar.Collapse id="navbar-top" className="justify-content-between mt-3 mt-lg-0">
          {/* Search Bar */}
          <Form className="d-flex flex-grow-1 mx-lg-4 mb-3 mb-lg-0" style={{ maxWidth: "600px" }}>
            <FormControl type="search" placeholder="Search natural handmade items..." className="me-2 rounded" />
            <Button className="search-button">Search</Button>
          </Form>

          {/* Right Side Links */}
          <Nav className="d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="woody-link">
              🏠 Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="woody-link position-relative">
              🛒 Shop
            </Nav.Link>

            {!user.id ? (
              <Nav.Link as={Link} to="/login" className="woody-link">
                👤 Login
              </Nav.Link>
            ) : (
              <NavDropdown
                title={
                  <>
                    {user.isAdmin ? "🛡️" : "👤"} {user.firstName}
                  </>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/orders">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
