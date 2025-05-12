import { useState } from "react";
import "./App.css";
import Login from "./Components/Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import ProtectedPages from "./services/ProtectedPages.jsx";
import Game from "./components/Game.jsx";
import MemoryGame from "./Components/MemoryGame.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* protected pages */}
          <Route path="/" element={<ProtectedPages />}>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<MemoryGame />} />
          </Route>
          <Route path="*" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
