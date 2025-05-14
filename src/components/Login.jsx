import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Alert, Form, FloatingLabel } from "react-bootstrap";
import PageTitle from "./PageTitle";
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setShowAlert(false);
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (
      input.email === loggeduser.email &&
      input.password === loggeduser.password
    ) {
      localStorage.setItem("loggedin", true);
      localStorage.setItem("user", JSON.stringify(loggeduser));
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setShowAlert(true);
    }
  };
  return (
    <>
      <PageTitle />
      <div className="container">
        <Card className="transparent-card">
          <Card.Title>
            <h2 className="text-uppercase text-center m-3">Login</h2>
          </Card.Title>
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group className="login-form">
                <FloatingLabel
                  controlId="floatingInputEmail"
                  label="Enter email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={input.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInputPassword"
                  label="Enter Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={input.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <Button type="submit" className="login-btn">Login</Button>
              </Form.Group>
              <Form.Group>
                {showAlert && (
                  <Alert
                    className="mt-2 fs-6"
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    Login Failed. Wrong email or password.
                  </Alert>
                )}
                {showSuccess && (
                  <Alert
                    className="mt-2 fs-6"
                    variant="success"
                    onClose={() => setShowSuccess(false)}
                    dismissible
                  >
                    Login success! You will be redirected to Game.
                  </Alert>
                )}
              </Form.Group>
              <Form.Group>
                <p className="text-center text-muted mt-5 mb-0">
                  Don't have an account?
                  <a href="/register" className="fw-bold text-body">
                    <u> Register here </u>
                  </a>
                </p>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
