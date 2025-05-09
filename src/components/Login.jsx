import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

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
      <div className="mask d-flex align-items-center h-100 ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>
                  <form onSubmit={handleLogin}>
                    <div className="form-outline mb-4">
                      <input
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                        type="email"
                        className="form-control form-control-lg"
                        id="id_email"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                        type="password"
                        className="form-control form-control-lg"
                        id="id_password"
                        placeholder="password"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg text-white"
                      >
                        Login
                      </button>
                    </div>
                    {showAlert && (
                      <Alert
                        className="mt-2"
                        variant="danger"
                        onClose={() => setShowAlert(false)}
                        dismissible
                      >
                        Login Failed. Wrong email or password.
                      </Alert>
                    )}
                    {showSuccess && (
                      <Alert
                        className="mt-2"
                        variant="success"
                        onClose={() => setShowSuccess(false)}
                        dismissible
                      >
                        Login success! You will be redirected to Game.
                      </Alert>
                    )}
                    <p className="text-center text-muted mt-5 mb-0">
                      Don't have an account?
                      <a href="/register" className="fw-bold text-body">
                        <u> Register here </u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
