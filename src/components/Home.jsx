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
      <div className="welcome-container" style={{ borderRadius: "15px" }}>
        <div className="welcome-container">
          <h2 className="welcome-text text-center">
            Welcome <span className="welcome-text">{userName.name}</span>{" "}
    
          </h2>
        </div>
        <div className="d-flex justify-content-center">
        <button
            onClick={openGame}
            type="submit"
            className="btn btn-start btn-block btn-lg"
          >
            Start Game
          </button>
          <button
            onClick={handleLogout}
            type="submit"
            className="btn btn-logout btn-block btn-sm text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
