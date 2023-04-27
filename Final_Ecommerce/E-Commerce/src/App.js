import React from "react";
import "./Assets/style.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Recentorder from "./Pages/Recentorder";
import Home from "./Components/Home/Home";
import Aboutus from "./Components/About";
import Addproduct from "./Components/addproduct";
import Signin from "./Pages/Auth/Signin";
import Contact from "./Components/contact";
import Signup from "./Pages/Auth/Signup";
import Products from "./Pages/Products";
import Error404 from "./Pages/Error404";
import Container from "./Components/Container";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Favorites from "./Pages/Favorites";

function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      {/* <Profile /> */}
      <Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Recentorder" element={<Recentorder />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/:category_id" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
