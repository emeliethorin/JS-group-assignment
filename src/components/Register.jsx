import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Alert, Form, FloatingLabel } from "react-bootstrap";
import "./Login.css";
import PageTitle from "./PageTitle";

function Register() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  //store value in local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const handleInputChange = (e) => {
    setShowSuccess(false);
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    <PageTitle />
      <div className="container">
        <Card className="text-left shadow p-3 mb-5 rounded">
          <Card.Title>
            <h2 className="text-uppercase text-center m-3">
              Create account
            </h2>
          </Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <FloatingLabel
                  controlId={input.name}
                  label="Enter a Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={input.name}
                    name="name"
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
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
                <Button type="submit" onClick={handleSubmit}>
                  Register
                </Button>
              </Form.Group>
              <Form.Group>
                {showSuccess && (
                      <Alert
                        className="mt-2"
                        variant="success"
                        onClose={() => setShowSuccess(false)}
                        dismissible
                      >
                        Registered Successfully.
                      </Alert>
                    )}
              </Form.Group>
              <Form.Group>
                <p className="text-center text-muted mt-5 mb-0">
                  Have already an account?
                  <a href="/login" className="fw-bold text-body">
                    <u> Login here </u>
                  </a>
                </p>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Register;
