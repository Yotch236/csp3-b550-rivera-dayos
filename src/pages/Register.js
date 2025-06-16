import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Notyf } from "notyf";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const notyf = new Notyf();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "email") {
      validateEmail(value);
    }

    if (name === "password") {
      validatePassword(value);
      validateConfirmPassword(formData.confirmPassword, value);
    }
    setMessage("");

    if (name === "confirmPassword") {
      validateConfirmPassword(value, formData.password);
    }
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/\D/g, ""); // digits only

    if (cleanedValue.length <= 11) {
      setMobileNumber(cleanedValue);
    }

    setMessage("");
  };

  const validateEmail = (email) => {
    const trimmed = email.trim();

    if (!trimmed) {
      setEmailError("");
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setEmailError("Please enter a valid email (e.g., example@domain.com)");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const trimmed = password.trim();

    if (!trimmed) {
      setPasswordError("");
      return;
    }
    const isValid = /^.{8,}$/.test(trimmed);

    if (!isValid) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPwd, originalPwd) => {
    if (!confirmPwd.trim()) {
      setConfirmPasswordError("");
      return;
    }

    if (confirmPwd !== originalPwd) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Check if all fields are filled and no errors exist
  const isFormValid =
    Object.values(formData).every((field) => field.trim() !== "") &&
    !passwordError &&
    !emailError &&
    !confirmPasswordError &&
    mobileNumber.length === 11;

  const userRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("${process.env.REACT_APP_API_BASE_URL}/users/register", formData);
      console.log("Registration successful:", res.data);
      // redirect or show message

      if (res.data.message === "User registered successfully") {
        setSuccess(true);
        setMessage(`User Registered Successfully ✅`);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/login";
        }, 1000);
      } else if (res.data.message === "Email already exists") {
        setSuccess(false);
        setMessage(`Email already exist ❌`);
        notyf.error("Registration Failed ❌ ");
        setLoading(false);
      } else {
        setSuccess(false);
        setMessage("Invalid Input ❌");
        notyf.error("Registration Failed ❌ ");
        setLoading(false);
      }
    } catch (err) {
      console.error("Registration error:", err);
      notyf.error("Registration Failed ❌ ");
      setLoading(false);
    }
  };

  const Asterisk = () => <span className="text-danger">*</span>;

  return (
    <Container
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "var(--woody-light)" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <div className="bg-white shadow-lg rounded p-5">
            <h2 className="text-center mb-4" style={{ color: "var(--woody-dark)" }}>
              Create an Account
            </h2>

            <Form onSubmit={userRegister}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                      First Name <Asterisk />
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>
                      Last Name <Asterisk />
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>
                  Email address <Asterisk />
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!emailError}
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMobileNumber">
                <Form.Label>
                  Mobile Number <Asterisk />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter your 11 digit mobile number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>
                  Password <Asterisk />
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!passwordError}
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>
                  Verify Password <Asterisk />
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Verify your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!confirmPasswordError}
                />
                <Form.Control.Feedback type="invalid">{confirmPasswordError}</Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="dark"
                type="submit"
                className="w-100 woody-toggle-btn"
                style={{ backgroundColor: "var(--woody-dark)", border: "none" }}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Redirecting to Login...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
              <p className={`mt-3 text-center ${success ? "text-success" : "text-danger"}`}>{message}</p>
            </Form>

            <div className="text-center my-3 text-muted">or</div>

            <Button
              variant="light"
              className="w-100 border d-flex align-items-center justify-content-center gap-2"
              onClick={() => (window.location.href = "${process.env.REACT_APP_API_BASE_URL}/users/google")}
            >
              <FcGoogle size={20} />
              Sign up with Google
            </Button>

            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none" style={{ color: "var(--woody-accent)" }}>
                Login here
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
