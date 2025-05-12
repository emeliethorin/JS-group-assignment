import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };
  const openGame = () => {
    navigate("/game");
  }
  return (
    <>
    <PageTitle />
    <div className="welcome-container">
      <div className="card opacity-10" style={{ borderRadius: "15px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-5">
            Welcome <span className="welcome-text">{userName.name}</span>{" "}
            to Memory Game
          </h2>
        </div>
        <div className="d-flex justify-content-evenly">
        <button
            onClick={openGame}
            type="submit"
            className="btn btn-info btn-block btn-lg text-black"
          >
            Start Game
          </button>
          <button
            onClick={handleLogout}
            type="submit"
            className="btn btn-success btn-block btn-sm text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
