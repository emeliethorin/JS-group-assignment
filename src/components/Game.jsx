import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";

const Game = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };
  return (
    <>
    <PageTitle />
    <div className="mask d-flex align-items-center h-100 ">
      <div className="card opacity-75" style={{ borderRadius: "15px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-5">
            Memory Game
          </h2>
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={handleLogout}
            type="submit"
            className="btn btn-success btn-block btn-sm gradient-custom-4 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Game;
