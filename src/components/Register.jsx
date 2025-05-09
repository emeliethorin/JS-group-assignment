import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

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

  const handleInputChange = (e)=>{
    setShowSuccess(false);
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="mask d-flex align-items-center h-100 ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control form-control-lg"
                        id="id_name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                        type="email"
                        className="form-control form-control-lg"
                        id="id_email"
                        placeholder="name@example.com"
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
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-white"
                      >
                        Register
                      </button>
                    </div>
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
                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?
                      <a href="/login" className="fw-bold text-body">
                        <u> Login here </u>
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
}

export default Register;
