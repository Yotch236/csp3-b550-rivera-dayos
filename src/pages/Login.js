import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Notyf } from "notyf";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const notyf = new Notyf();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/users/google";
  };

  const userLogin = async (e) => {
    e.preventDefault(); // prevent page refresh
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        email,
        password,
      });

      // Example: if access is present, assume success
      if (res.data.access) {
        setSuccess(true);
        setMessage("Login Successful ✅");
        notyf.success("Login Successful ✅");
        localStorage.setItem("token", res.data.access);

        // Simulate delay before redirect
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/";
        }, 1000);
      } else {
        setSuccess(false);
        setMessage("Email or password is incorrect ❌");
        notyf.error("Email or password is incorrect ❌");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setMessage("Email or password is incorrect ❌");
      notyf.error("Login failed ❌");
      setLoading(false);  
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: "var(--woody-dark)" }}>
                Login
              </h3>

              <Form onSubmit={userLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMessage("");
                    }}
                  />
                </Form.Group>

                

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessage("");
                    }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a href="#" className="text-decoration-none" style={{ color: "var(--woody-accent)" }}>
                    Forgot password?
                  </a>
                </div>

                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 woody-toggle-btn d-flex justify-content-center align-items-center"
                  disabled={!email || !password || loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <p className={`mt-3 text-center ${success ? "text-success" : "text-danger"}`}>{message}</p>

                <div className="my-3 text-center text-muted">or</div>

                <Button
                  variant="light"
                  className="w-100 border d-flex align-items-center justify-content-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle size={20} />
                  Login with Google
                </Button>

                <div className="mt-3 text-center">
                  <span>Don't have an account? </span>
                  <a href="/register" style={{ color: "var(--woody-accent)" }}>
                    Register
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
