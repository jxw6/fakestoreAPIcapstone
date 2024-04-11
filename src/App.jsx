import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import cartLogo from "./assets/shopping_cart-512.webp"
import Register from "./components/Register";
import Login from "./components/Login";
import "./index.css";

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <h1>
        <img id="logo-image" src={cartLogo} />
        Fake Store
      </h1>
      <div id="container">
        <Navbar token={token} />
      </div>
      <div>
        <Routes>
          <Route path="" element={<Home token={token} />} />
          <Route path="/products" element={<Products navigate={navigate} />} />
          <Route
            path="/products/:id"
            element={<SingleProduct token={token} navigate={navigate} />}
          />
          <Route path="/register" element={<Register setToken={setToken} navigate={navigate} />}/>
          <Route
            path="/login"
            element={<Login setToken={setToken} navigate={navigate} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
